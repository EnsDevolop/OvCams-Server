// import { PassportStrategy } from '@nestjs/passport';
// import { Profile, Strategy } from 'passport-kakao';

// export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
//   constructor() {
//     super({
//       clientID: '',
//       clientSecret: '',
//       callbackURL: 'http://localhost:8080/auth/kakao/redirect',
//       scope: ['account_email', 'profile_nickname'],
//     });
//   }

//   async validate(
//     accessToken: string,
//     refreshToken: string,
//     profile: Profile,
//     done: any,
//   ): Promise<any> {
//     const { name, account_email, profile_image } = profile;
//     const user = {
//       provider: 'kakao',
//     };
//     done(null, user);
//   }
// }
