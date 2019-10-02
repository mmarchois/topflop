import { QueryHandler } from '@nestjs/cqrs';
import { GetCompagnyByIdQuery } from './GetCompagnyByIdQuery';
import { Compagny } from 'src/Domain/Compagny/Compagny.entity';
import { ICompagnyRepository } from 'src/Domain/Compagny/Repository/ICompagnyRepository';
import { Inject } from '@nestjs/common';

@QueryHandler(GetCompagnyByIdQuery)
export class GetCompagnyByIdQueryHandler {
  constructor(
    @Inject('ICompagnyRepository')
    private readonly repository: ICompagnyRepository,
  ) {}

  public execute = async (query: GetCompagnyByIdQuery): Promise<Compagny> => {
    return await this.repository.findOneById(query.id);
  };
}
