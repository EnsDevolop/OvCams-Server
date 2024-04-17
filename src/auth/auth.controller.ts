import {
  Controller,
  Get,
  Req,
  Res,
  UseGuards,
  Headers,
  Put,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
    this.authService = authService;
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleAuth() {}

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const data = await this.authService.login(req);

    const accessMaxAge = 4 * 60 * 60 * 1000;
    const refreshMaxAge = 4 * 24 * 60 * 60 * 1000;

    res.cookie('access_token', data.accessToken, {
      maxAge: accessMaxAge,
    });
    res.cookie('refresh_token', data.refreshToken, {
      maxAge: refreshMaxAge,
    });

    res.redirect('http://localhost:3000/home');
  }

  @Get('/naver')
  @UseGuards(AuthGuard('naver'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async naverAuth() {}

  @Get('/naver/redirect')
  @UseGuards(AuthGuard('naver'))
  async naverAuthRedirect(@Req() req, @Res() res) {
    const data = await this.authService.login(req);

    const expirationDate = new Date(Date.now() + 4 * 60 * 60 * 1000);

    res.cookie(
      'access_token',
      data.accessToken,
      { maxAge: expirationDate },
      {
        httpOnly: true,
      },
    );
    res.cookie('refresh_token', data.refreshToken, {
      httpOnly: true,
    });

    res.redirect('http://localhost:3000/home');
  }

  @Put('/reissue')
  async reissue(@Headers('Refresh-Token') token: any) {
    const data = await this.authService.putReissue(token);
    return Object.assign(data);
  }
  @Get('/profile')
  async profile(@Headers('Authorization') token: any) {
    const data = await this.authService.getProfile(token);
    return Object.assign({ data });
  }
}
