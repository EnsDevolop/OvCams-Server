import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampingEntity } from './entity/camping.entity';
import { CampingService } from './camping.service';
import { CampingController } from './camping.controller';
import { AuthEntity } from 'src/auth/entity/auth.entity';
import { UserCampingLikesEntity } from 'src/like/entity/like.entity';
import { UserCampingReviewsEntity } from 'src/review/entity/review.entity';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CampingEntity,
      AuthEntity,
      UserCampingLikesEntity,
      UserCampingReviewsEntity,
    ]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('SECRETORPRIVATE'),
        signOptions: {
          expiresIn: '4h',
        },
        verifyOptions: {
          complete: false,
        },
      }),
    }),
  ],
  providers: [CampingService, AuthService],
  controllers: [CampingController],
})
export class CampingModule {}
