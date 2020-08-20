import {QueryHandler} from '@nestjs/cqrs';
import {GetUsersByCompagnyQuery} from './GetUsersByCompagnyQuery';
import {Inject} from '@nestjs/common';
import {IUserCompagnyRepository} from 'src/Domain/User/Repository/IUserCompagnyRepository';
import {UserView} from '../View/UserView';
import {Pagination} from 'src/Application/Common/Pagination';

@QueryHandler(GetUsersByCompagnyQuery)
export class GetUsersByCompagnyQueryHandler {
  constructor(
    @Inject('IUserCompagnyRepository')
    private readonly userCompagnyRepository: IUserCompagnyRepository
  ) {}

  public execute = async (
    query: GetUsersByCompagnyQuery
  ): Promise<Pagination<UserView>> => {
    const {user, filters} = query;
    const userViews = [];

    const [
      userCompanies,
      total
    ] = await this.userCompagnyRepository.findByCompagnyAndFilters(
      user.currentCompagny,
      filters
    );

    for (const userCompagny of userCompanies) {
      userViews.push(
        new UserView(
          userCompagny.user,
          userCompagny.compagny,
          userCompagny.role
        )
      );
    }

    return new Pagination<UserView>(userViews, total);
  };
}
