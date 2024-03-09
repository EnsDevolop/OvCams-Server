import { Repository } from 'typeorm';
import { UserCampingEntity } from './entity/like.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { AuthEntity } from 'src/auth/entity/auth.entity';
import { CampingEntity } from 'src/camping/entity/camping.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(UserCampingEntity)
    private userCampingEntity: Repository<UserCampingEntity>,
    @InjectRepository(AuthEntity) private authEntity: Repository<AuthEntity>,
    @InjectRepository(CampingEntity)
    private campingEntity: Repository<CampingEntity>,
    private authService: AuthService,
  ) {
    this.userCampingEntity = userCampingEntity;
    this.authService = authService;
    this.campingEntity = campingEntity;
  }

  async like(token: string, campingID: number) {
    const { email } = await this.authService.validateAccess(token);
    const user = await this.authEntity.findOneBy({ email });
    const camping = await this.campingEntity.findOneBy({ campingID });

    const existingLike = await this.userCampingEntity.findOne({
      where: { camping, user },
    });

    if (existingLike) {
      await this.userCampingEntity.update(existingLike, {
        is_Valid: !existingLike.is_Valid,
      });
    } else {
      await this.userCampingEntity.save({
        camping,
        user,
      });
    }

    return existingLike;
  }
}
