import { CompagnyView } from 'src/Application/Compagny/View/CompagnyView';
import { User } from 'src/Domain/User/User.entity';
import { Compagny } from 'src/Domain/Compagny/Compagny.entity';

export class UserView {
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly email: string;
  public readonly role?: string;
  public readonly compagny?: CompagnyView;

  constructor(user: User, compagny?: Compagny, role?: string) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.role = role;
    this.compagny = compagny
      ? new CompagnyView(compagny.id, compagny.name)
      : null;
  }
}
