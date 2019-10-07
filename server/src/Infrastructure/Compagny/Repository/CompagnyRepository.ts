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

  public findOneById = async (id: string): Promise<Compagny | null> => {
    return await this.repository
      .createQueryBuilder('compagny')
      .where('compagny.id = :id', { id })
      .getOne();
  };

  public findOneByName = async (name: string): Promise<Compagny | null> => {
    return await this.repository
      .createQueryBuilder('compagny')
      .where('LOWER(compagny.name) = LOWER(:name)', { name })
      .getOne();
  };
}
