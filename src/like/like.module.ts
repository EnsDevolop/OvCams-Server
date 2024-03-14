import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { UserCampingLikesEntity } from './entity/like.entity';
import { AuthEntity } from 'src/auth/entity/auth.entity';
import { AuthService } from 'src/auth/auth.service';
import { CampingEntity } from 'src/camping/entity/camping.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserCampingLikesEntity,
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
  providers: [LikeService, AuthService],
  controllers: [LikeController],
})
export class LikeModule {}
