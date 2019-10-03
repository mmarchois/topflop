import { Inject } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { GetInputsByCompagnyQuery } from './GetInputsByCompagnyQuery';
import { IInputRepository } from 'src/Domain/Input/Repository/IInputRepository';
import { InputListView } from '../View/InputListView';
import { UsernameView } from 'src/Application/User/View/UsernameView';

@QueryHandler(GetInputsByCompagnyQuery)
export class GetInputsByCompagnyQueryHandler {
  constructor(
    @Inject('IInputRepository')
    private readonly repository: IInputRepository,
  ) {}

  public execute = async (
    query: GetInputsByCompagnyQuery,
  ): Promise<InputListView[]> => {
    const { compagny, filters } = query;
    const inputViews = [];
    const results = await this.repository.findByCompagny(compagny, filters);

    for (const result of results) {
      inputViews.push(
        new InputListView(
          result.counter,
          new UsernameView(result.firstname, result.lastname),
        ),
      );
    }

    return inputViews;
  };
}
