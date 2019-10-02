import { User } from 'src/Domain/User/User.entity';
import { IQuery } from 'src/Application/IQuery';
import { UserFiltersDto } from 'src/Infrastructure/User/Controller/Dto/UserFiltersDto';

export class GetUsersByCompagnyQuery implements IQuery {
  constructor(
    public readonly user: User,
    public readonly filters: UserFiltersDto,
  ) {}
}
