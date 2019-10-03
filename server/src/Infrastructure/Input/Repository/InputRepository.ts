import { IInputRepository } from 'src/Domain/Input/Repository/IInputRepository';
import { Input } from 'src/Domain/Input/Input.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Compagny } from 'src/Domain/Compagny/Compagny.entity';
import { InputFiltersDto } from '../Controller/Dto/InputFiltersDto';

@Injectable()
export class InputRepository implements IInputRepository {
  constructor(
    @InjectRepository(Input)
    private readonly repository: Repository<Input>,
  ) {}

  public save = async (input: Input): Promise<Input> => {
    return await this.repository.save(input);
  };

  public findByCompagny = async (
    compagny: Compagny,
    filters: InputFiltersDto,
  ): Promise<[]> => {
    return await this.repository
      .createQueryBuilder('input')
      .select('count(input.id) as counter')
      .addSelect('author.firstName as firstName')
      .addSelect('author.lastName as lastName')
      .where('input.compagny = :compagny', { compagny: compagny.id })
      .andWhere('input.type = :type', { type: filters.type })
      .andWhere('input.createdAt >= :fromDate and input.createdAt <= :toDate', {
        fromDate: filters.fromDate,
        toDate: filters.toDate,
      })
      .innerJoin('input.author', 'author')
      .groupBy('author.firstName')
      .addGroupBy('author.lastName')
      .orderBy('counter', 'DESC')
      .addOrderBy('author.lastName', 'ASC')
      .execute();
  };
}
