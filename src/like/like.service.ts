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
    private campinEntity: Repository<CampingEntity>,
    private authService: AuthService,
  ) {
    this.userCampingEntity = userCampingEntity;
    this.authService = authService;
    this.campinEntity = campinEntity;
  }

  async like(token, campingID) {

  }
} 
