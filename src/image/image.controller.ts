import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('image')
export class ImageController {
  constructor(private imageService: ImageService) {
    this.imageService = imageService;
  }
  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  async saveImage(@UploadedFile() file: Express.Multer.File) {
    const data = await this.imageService.imageUploadToS3(file);
    return Object.assign({
      img: data,
      statusCode: 201,
      statusMsg: '댓글 작성 성공',
    });
  }
}
