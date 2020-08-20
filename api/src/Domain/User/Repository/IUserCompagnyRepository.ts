import {UserCompagny} from '../UserCompagny.entity';
import {User} from '../User.entity';
import {Compagny} from 'src/Domain/Compagny/Compagny.entity';
import {UserFiltersDto} from 'src/Infrastructure/User/Controller/Dto/UserFiltersDto';

export interface IUserCompagnyRepository {
  save(userCompagny: UserCompagny): Promise<UserCompagny>;
  findOneByUserAndCompagny(
    user: User,
    compagny: Compagny
  ): Promise<UserCompagny>;
  findOneByUserAndCompagnyAndRole(
    user: User,
    compagny: Compagny,
    role: string
  ): Promise<UserCompagny>;
  findOneByEmailAndCompagny(
    email: string,
    compagny: Compagny
  ): Promise<UserCompagny>;
  findByCompagnyAndFilters(
    compagny: Compagny,
    filters: UserFiltersDto
  ): Promise<[UserCompagny[], number]>;
  findByUser(user: User): Promise<UserCompagny[]>;
  deleteByUserAndCompagny(user: User, compagny: Compagny);
}
