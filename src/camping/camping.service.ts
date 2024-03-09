import { Injectable } from '@nestjs/common';
import { CampingEntity } from './entity/camping.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CampingService {
  constructor(
    @InjectRepository(CampingEntity)
    private campingEntity: Repository<CampingEntity>,
  ) {
    this.campingEntity = campingEntity;
  }

  async createCamping(camping) {
    // const { email } = await this.authService.validateAccess(token);

    const {
      placeName,
      country,
      address,
      number,
      period,
      homepage,
      content,
      facility,
    } = camping;

    const thisCamping = await this.campingEntity.findOneBy({
      placeName,
    });

    await this.campingEntity.save({
      placeName,
      country,
      address,
      number,
      period,
      homepage,
      content,
      facility,
    });
  }

  async paginate(page = 1): Promise<any> {
    const take = 1;

    const [campings, total] = await this.campingEntity.findAndCount({
      take,
      skip: (page - 1) * take,
    });

    return {
      data: campings,
      meta: {
        total,
        page,
        last_page: Math.ceil(total / take),
      },
    };
  }
}
