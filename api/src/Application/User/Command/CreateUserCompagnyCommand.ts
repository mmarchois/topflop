import {ICommand} from 'src/Application/ICommand';
import {User} from 'src/Domain/User/User.entity';
import {Compagny} from 'src/Domain/Compagny/Compagny.entity';
import {UserRole} from 'src/Domain/User/UserCompagny.entity';

export class CreateUserCompagnyCommand implements ICommand {
  constructor(
    public readonly user: User,
    public readonly compagny: Compagny,
    public readonly role: string = UserRole.ADMIN
  ) {}
}
