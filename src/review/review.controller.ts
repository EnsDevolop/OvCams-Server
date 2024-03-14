import { Body, Controller, Post, Headers, Param } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewDto } from './dto/review.dto';

@Controller('review')
export class ReviewController {
  constructor(private reviewServiece: ReviewService) {
    this.reviewServiece = reviewServiece;
  }

  @Post('/:campingID')
  async postReview(
    @Headers('Authorization') token: any,
    @Param('campingID') id: string,
    @Body() content: ReviewDto,
  ): Promise<object> {
    const data = await this.reviewServiece.review(token, id, content.content);
    return Object.assign({
      data,
      statusCode: 201,
      statusMsg: '댓글 작성 성공',
    });
  }
}
