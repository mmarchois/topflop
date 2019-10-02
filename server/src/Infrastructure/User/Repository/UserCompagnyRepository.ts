import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserCompagny } from 'src/Domain/User/UserCompagny.entity';
import { IUserCompagnyRepository } from 'src/Domain/User/Repository/IUserCompagnyRepository';
import { User } from 'src/Domain/User/User.entity';
import { Compagny } from 'src/Domain/Compagny/Compagny.entity';

@Injectable()
export class UserCompagnyRepository implements IUserCompagnyRepository {
  constructor(
    @InjectRepository(UserCompagny)
    private readonly repository: Repository<UserCompagny>,
  ) {}

  public save = async (userCompagny: UserCompagny): Promise<UserCompagny> => {
    return await this.repository.save(userCompagny);
  };

  public findOneByUserAndCompagny = async (
    user: User,
    compagny: Compagny,
  ): Promise<UserCompagny> => {
    return await this.repository
      .createQueryBuilder('userCompagny')
      .select(['userCompagny.id', 'userCompagny.role'])
      .where('userCompagny.user = :user', { user: user.id })
      .andWhere('userCompagny.compagny = :compagny', { compagny: compagny.id })
      .getOne();
  };

  public findOneByUserAndCompagnyAndRole = async (
    user: User,
    compagny: Compagny,
    role: string,
  ): Promise<UserCompagny> => {
    return await this.repository
      .createQueryBuilder('userCompagny')
      .select(['userCompagny.id'])
      .where('userCompagny.user = :user', { user: user.id })
      .andWhere('userCompagny.compagny = :compagny', { compagny: compagny.id })
      .andWhere('userCompagny.role = :role', { role })
      .getOne();
  };

  public findOneByEmailAndCompagny = async (
    email: string,
    compagny: Compagny,
  ): Promise<UserCompagny> => {
    return await this.repository
      .createQueryBuilder('userCompagny')
      .select(['userCompagny.id'])
      .innerJoin('userCompagny.user', 'user')
      .where('user.email = :email', { email })
      .andWhere('userCompagny.compagny = :compagny', { compagny: compagny.id })
      .getOne();
  };
}
