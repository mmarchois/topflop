import { User } from './User.entity';
import { Compagny } from '../Compagny/Compagny.entity';
import { IUserCompagnyRepository } from './Repository/IUserCompagnyRepository';
import { Inject } from '@nestjs/common';
import { UserCompagny, UserRole } from './UserCompagny.entity';

export class IsAdminOfCompagny {
  constructor(
    @Inject('IUserCompagnyRepository')
    private readonly userCompagnyRepository: IUserCompagnyRepository,
  ) {}

  public isSatisfiedBy = async (
    user: User,
    compagny: Compagny,
  ): Promise<boolean> => {
    return (
      (await this.userCompagnyRepository.findOneByUserAndCompagnyAndRole(
        user,
        compagny,
        UserRole.ADMIN,
      )) instanceof UserCompagny
    );
  };
}
