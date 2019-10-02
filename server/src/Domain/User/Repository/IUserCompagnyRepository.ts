import { UserCompagny } from '../UserCompagny.entity';
import { User } from '../User.entity';
import { Compagny } from 'src/Domain/Compagny/Compagny.entity';

export interface IUserCompagnyRepository {
  save(userCompagny: UserCompagny): Promise<UserCompagny>;
  findOneByUserAndCompagny(
    user: User,
    compagny: Compagny,
  ): Promise<UserCompagny>;
  findOneByUserAndCompagnyAndRole(
    user: User,
    compagny: Compagny,
    role: string,
  ): Promise<UserCompagny>;
  findOneByEmailAndCompagny(
    email: string,
    compagny: Compagny,
  ): Promise<UserCompagny>;
}
