import { Controller, Get, Headers, Param, Patch } from '@nestjs/common';
import { LikeService } from './like.service';

@Controller('like')
export class LikeController {
  constructor(private likeService: LikeService) {
    this.likeService = likeService;
  }

  @Patch('/:campingID')
  async patchLike(
    @Headers('Authorization') token: any,
    @Param('campingID') id: string,
  ): Promise<object> {
    const data = await this.likeService.like(token, id);

    return Object.assign({
      data,
      statusCode: 201,
      statusMsg: '업로드 성공',
    });
  }

  @Get('/')
  async getAllLike(@Headers('Authorization') token: any) {
    const data = await this.likeService.getAllLike(token);
    return Object.assign({
      data,
      statusCode: 200,
      statusMsg: '조회 성공',
    });
  }
}
