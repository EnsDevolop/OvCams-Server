import { Repository } from 'typeorm';
import { UserCampingLikesEntity } from './entity/like.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { AuthEntity } from 'src/auth/entity/auth.entity';
import { CampingEntity } from 'src/camping/entity/camping.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(UserCampingLikesEntity)
    private userCampingLikesEntity: Repository<UserCampingLikesEntity>,
    @InjectRepository(AuthEntity) private authEntity: Repository<AuthEntity>,
    @InjectRepository(CampingEntity)
    private campingEntity: Repository<CampingEntity>,
    private authService: AuthService,
  ) {
    this.userCampingLikesEntity = userCampingLikesEntity;
    this.authService = authService;
    this.campingEntity = campingEntity;
  }

  async like(token: string, campingID: string) {
    const { email } = await this.authService.validateAccess(token);
    const user = await this.authEntity.findOneBy({ email });
    const camping = await this.campingEntity.findOneBy({
      campingID: parseInt(campingID),
    });

    const existingLike = await this.userCampingLikesEntity.findOne({
      where: {
        camping: { campingID: parseInt(campingID) },
        user: { userID: user.userID },
      },
    });

    if (existingLike) {
      await this.userCampingLikesEntity.update(existingLike, {
        is_Valid: !existingLike.is_Valid,
        is_Count: !existingLike.is_Valid
          ? existingLike.is_Count + 1
          : existingLike.is_Count - 1,
      });
    } else {
      await this.userCampingLikesEntity.save({
        camping,
        user,
      });
    }

    return existingLike;
  }

  async getAllLike(token: string) {
    const { email } = await this.authService.validateAccess(token);
    const user = await this.authEntity.findOneBy({ email });
    const existingLikes = await this.userCampingLikesEntity.find({
      where: { user },
      relations: ['camping'],
    });

    return existingLikes.map((like) => {
      const camping = like.camping;
      camping.like = true;
      return camping;
    });
  }
}
