import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthEntity } from './entity/auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { GoogleStrategy } from './strategy/google.strategy';
import { NaverStrategy } from './strategy/naver.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthEntity]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: () => ({
        secret: process.env.SECRETORPRIVATE,
        signOptions: {
          expiresIn: '14400000',
        },
        verifyOptions: {
          complete: false,
        },
      }),
    }),
  ],
  providers: [AuthService, GoogleStrategy, NaverStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
