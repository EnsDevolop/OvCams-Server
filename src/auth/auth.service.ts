import { Injectable, UnauthorizedException } from '@nestjs/common';
import Redis from 'ioredis';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { AuthEntity } from './entity/auth.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { TokenResultDto } from './dto/tokenResult.dto';
import { LoginDto } from './dto/login.dto';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity) private authEntity: Repository<AuthEntity>,
    @InjectRedis() private readonly redis: Redis,
    private readonly jwt: JwtService,
    private config: ConfigService,
  ) {
    this.authEntity = authEntity;
  }

  async login(req: { user: LoginDto }) {
    const { email, name, picture } = req.user;

    const thisUser = await this.authEntity.findOneBy({ email });
    if (!thisUser) {
      await this.authEntity.save({
        email,
        name,
        picture,
      });
    }
    const access = await this.generateAccessToken(email, name);
    const refresh = await this.generateRefreshToken(email, name);

    await this.redis.set(`${email}AccessToken`, access);
    await this.redis.set(`${email}RefreshToken`, refresh);

    return {
      accessToken: access,
      refreshToken: refresh,
    };
  }

  async getProfile(token: string) {
    const { email } = await this.validateAccess(token);
    const user = await this.authEntity.findOneBy({ email });
    return user;
  }

  async generateAccessToken(email: string, name: string) {
    const payload = {
      email,
      name,
    };

    const access = this.jwt.sign(payload, {
      secret: process.env.JWT_SECRET_ACCESS,
    });

    return `${access}`;
  }

  async generateRefreshToken(email: string, name: string) {
    const payload = {
      email,
      name,
    };

    const refresh = this.jwt.sign(payload, {
      secret: process.env.JWT_SECRET_REFRESH,
      expiresIn: '7d',
    });

    return `${refresh}`;
  }

  async validateAccess(tokenDto: string): Promise<TokenResultDto> {
    const accesstoken = tokenDto.split(' ')[1];

    console.log(process.env.JWT_SECRET_ACCESS);
    const access = await this.jwt.verifyAsync(accesstoken, {
      secret: process.env.JWT_SECRET_ACCESS,
    });

    if (!access) {
      throw new UnauthorizedException('adsf');
    }

    return access;
  }
}
