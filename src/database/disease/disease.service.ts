import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Disease } from './entities/disease.entity';

@Injectable()
export class DiseaseService {
  constructor(
    @InjectRepository(Disease)
    private readonly diseaseRepository: Repository<Disease>,
  ) {}

  async getDiseases(id: any){
    const result = await this.diseaseRepository.findOne({
      where: [
        {
          id
        }
      ]
    });
    return result
  }
}
