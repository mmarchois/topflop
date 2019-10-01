import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { IQuery } from 'src/Application/IQuery';
import { IQueryBusAdapter } from 'src/Application/Adapter/IQueryBusAdapter';

@Injectable()
export class QueryBusAdapter implements IQueryBusAdapter {
  constructor(private readonly queryBus: QueryBus) {}

  public execute = (query: IQuery): any => {
    return this.queryBus.execute(query);
  };
}
