import { QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetCompaniesByUserQuery } from './GetCompaniesByUserQuery';
import { IUserCompagnyRepository } from 'src/Domain/User/Repository/IUserCompagnyRepository';
import { CompagnyView } from '../View/CompagnyView';

@QueryHandler(GetCompaniesByUserQuery)
export class GetCompaniesByUserQueryHandler {
  constructor(
    @Inject('IUserCompagnyRepository')
    private readonly repository: IUserCompagnyRepository,
  ) {}

  public execute = async (
    query: GetCompaniesByUserQuery,
  ): Promise<CompagnyView[]> => {
    const results = await this.repository.findByUser(query.user);
    const compagnyViews = [];

    for (const result of results) {
      const { compagny, role } = result;

      compagnyViews.push(
        new CompagnyView(compagny.id, compagny.name, compagny.voucher, role),
      );
    }

    return compagnyViews;
  };
}
