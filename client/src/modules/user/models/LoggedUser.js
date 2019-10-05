import Compagny from '../../compagny/models/Compagny';

export default class LoggedUser {
  constructor(user) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.role = user.role;
    this.compagny = user.compagny ? new Compagny(user.compagny) : null;
  }
}
