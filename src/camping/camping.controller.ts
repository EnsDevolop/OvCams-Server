import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Headers,
  Param,
} from '@nestjs/common';
import { CampingService } from './camping.service';
import { CampinDto } from './dto/camping.dto';

@Controller('camping')
export class CampingController {
  constructor(private campingService: CampingService) {
    this.campingService = campingService;
  }

  @Get('')
  async getAll(@Query('page') page = 1): Promise<object> {
    const data = await this.campingService.paginate(page);

    return Object.assign({
      data,
      statusCode: 200,
      statusMsg: '조회 성공',
    });
  }

  @Post('')
  async postCamping(
    @Headers('Authorization') token: any,
    @Body() camping: CampinDto,
  ): Promise<object> {
    const data = await this.campingService.createCamping(token, camping);

    return Object.assign({
      data,
      statusCode: 201,
      statusMsg: '업로드 성공',
    });
  }

  @Get('/:campingID')
  async getCampingAbout(
    @Headers('Authorization') token: any,
    @Param('campingID') id: string,
  ): Promise<object> {
    const data = await this.campingService.getAbout(token, id);

    return Object.assign({
      data,
      statusCode: 200,
      statusMsg: '조회 성공',
    });
  }
}
