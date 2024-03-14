import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthEntity } from 'src/auth/entity/auth.entity';
import { AuthService } from 'src/auth/auth.service';
import { CampingEntity } from 'src/camping/entity/camping.entity';
import { ReviewService } from './review.service';
import { UserCampingReviewsEntity } from './entity/review.entity';
import { ReviewController } from './review.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserCampingReviewsEntity,
      AuthEntity,
      CampingEntity,
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
  providers: [ReviewService, AuthService],
  controllers: [ReviewController],
})
export class ReviewModule {}
