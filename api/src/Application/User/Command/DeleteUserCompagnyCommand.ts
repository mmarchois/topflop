import {ICommand} from 'src/Application/ICommand';
import {User} from 'src/Domain/User/User.entity';

export class DeleteUserCompagnyCommand implements ICommand {
  constructor(public readonly loggedUser: User, public readonly user: User) {}
}
