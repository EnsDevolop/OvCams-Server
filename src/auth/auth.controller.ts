import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
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

    res.redirect('http://localhost:3000/auth');
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

    res.redirect('http://localhost:3000/auth');
  }
}
