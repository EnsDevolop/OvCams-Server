import { Injectable } from '@nestjs/common';
import { CampingEntity } from './entity/camping.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { AuthEntity } from 'src/auth/entity/auth.entity';
import { UserCampingLikesEntity } from 'src/like/entity/like.entity';
import { UserCampingReviewsEntity } from 'src/review/entity/review.entity';

@Injectable()
export class CampingService {
  constructor(
    @InjectRepository(CampingEntity)
    private campingEntity: Repository<CampingEntity>,
    @InjectRepository(AuthEntity) private authEntity: Repository<AuthEntity>,
    @InjectRepository(UserCampingLikesEntity)
    private userCampingLikesEntity: Repository<UserCampingLikesEntity>,
    @InjectRepository(UserCampingReviewsEntity)
    private userCampingReviewsEntity: Repository<UserCampingReviewsEntity>,
    private authService: AuthService,
  ) {
    this.campingEntity = campingEntity;
    this.authEntity = authEntity;
  }

  async createCamping(token, camping) {
    const { email } = await this.authService.validateAccess(token);
    if (email) {
      const { placeName } = camping;

      const thisCamping = await this.campingEntity.findOneBy({
        placeName,
      });

      if (thisCamping) {
        await this.campingEntity.save(camping);
      }
    }
  }

  async paginate(p: string, country: string, page = 1, take = 9): Promise<any> {
    const [campings, total] = await this.campingEntity.findAndCount({
      where: { country, placeName: Like(`%${p}%`) },
      take,
      skip: (page - 1) * take,
    });

    return {
      data: campings,
      meta: {
        total,
        page,
        last_page: Math.ceil(total / take),
      },
    };
  }

  async getAbout(token: string, campingID: string) {
    const camping = await this.campingEntity.findOneBy({
      campingID: parseInt(campingID),
    });
    if (camping) {
      const existingReviews = await this.userCampingReviewsEntity.find({
        where: { camping: { campingID: parseInt(campingID) } },
        relations: ['user'],
      });
      const existingLikeCount = await this.userCampingLikesEntity.findOne({
        where: {
          camping: { campingID: parseInt(campingID) },
        },
      });
      camping.reviews = existingReviews;
      if (token) {
        const { email } = await this.authService.validateAccess(token);
        const user = await this.authEntity.findOneBy({ email });
        const existingLike = await this.userCampingLikesEntity.findOne({
          where: {
            camping: { campingID: parseInt(campingID) },
            user: { userID: user.userID },
          },
        });

        camping.like = existingLike.is_Valid;
      } else {
        camping.like = false;
      }
      camping.like_count = existingLikeCount.is_Count;
      return camping;
    }
  }
}
