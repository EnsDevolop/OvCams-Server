import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ConfigModule } from '@nestjs/config';
import { ImageController } from './image.controller';

@Module({
  imports: [ConfigModule],
  providers: [ImageService],
  controllers: [ImageController],
})
export class ImageModule {}
