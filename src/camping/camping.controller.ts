import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CampingService } from './camping.service';
import { CampinDto } from './dto/camping.dto';

@Controller('camping')
export class CampingController {
  constructor(private campingService: CampingService) {
    this.campingService = campingService;
  }

  @Get('/camping')
  async getAll(@Query('page') page = 1): Promise<object> {
    const data = await this.campingService.paginate(page);

    return Object.assign({
      data,
      statusCode: 200,
      statusMsg: '조회 성공',
    });
  }

  @Post('/camping')
  async postCamping(@Body() camping: CampinDto): Promise<object> {
    const data = await this.campingService.createCamping(camping);

    return Object.assign({
      data,
      statusCode: 201,
      statusMsg: '업로드 성공',
    });
  }
}
