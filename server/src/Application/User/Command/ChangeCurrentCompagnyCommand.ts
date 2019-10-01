import { ICommand } from 'src/Application/ICommand';
import { User } from 'src/Domain/User/User.entity';
import { Compagny } from 'src/Domain/Compagny/Compagny.entity';

export class ChangeCurrentCompagnyCommand implements ICommand {
  constructor(public readonly user: User, public readonly compagny: Compagny) {}
}
