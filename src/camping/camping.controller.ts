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
import { CampingDto } from './dto/camping.dto';
import { take } from 'rxjs';

@Controller('camping')
export class CampingController {
  constructor(private campingService: CampingService) {
    this.campingService = campingService;
  }

  @Get('')
  async getAll(
    @Query('p') p,
    @Query('country') country = 'KOREA',
    @Query('page') page = 1,
    @Query('take') take = 9,
  ): Promise<object> {
    const data = await this.campingService.paginate(p, country, page, take);

    return Object.assign({
      data,
      statusCode: 200,
      statusMsg: '조회 성공',
    });
  }

  @Post('')
  async postCamping(
    @Headers('Authorization') token: any,
    @Body() camping: CampingDto,
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
