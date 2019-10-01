import { ICompagnyRepository } from 'src/Domain/Compagny/Repository/ICompagnyRepository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Compagny } from 'src/Domain/Compagny/Compagny.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompagnyRepository implements ICompagnyRepository {
  constructor(
    @InjectRepository(Compagny)
    private readonly repository: Repository<Compagny>,
  ) {}

  public save = async (compagny: Compagny): Promise<Compagny> => {
    return await this.repository.save(compagny);
  };
}
