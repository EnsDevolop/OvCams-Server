import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-naver';
import { config } from 'dotenv';
import { Injectable } from '@nestjs/common';

config();

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    super({
      clientID: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
      callbackURL: 'http://localhost:8080/auth/naver/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ): Promise<any> {
    console.log(profile);
    const { displayName, emails, _json } = profile;

    const user = {
      provider: 'naver',
      email: emails[0].value,
      name: displayName,
      picture: _json.profile_image,
      accessToken,
    };
    done(null, user);
  }
}
