import Compagny from '../../compagny/models/Compagny';

export default class LoggedUser {
  constructor(user) {
    console.log(user.firstName);
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.role = user.role;
    this.compagny = new Compagny(user.compagny);
  }
}
