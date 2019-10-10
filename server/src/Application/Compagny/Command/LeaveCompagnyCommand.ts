import { ICommand } from 'src/Application/ICommand';
import { Compagny } from 'src/Domain/Compagny/Compagny.entity';
import { User } from 'src/Domain/User/User.entity';

export class LeaveCompagnyCommand implements ICommand {
  constructor(public readonly compagny: Compagny, public readonly user: User) {}
}
