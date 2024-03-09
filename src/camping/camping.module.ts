import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampingEntity } from './entity/camping.entity';
import { CampingService } from './camping.service';
import { CampingController } from './camping.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CampingEntity])],
  providers: [CampingService],
  controllers: [CampingController],
})
export class CampingModule {}
