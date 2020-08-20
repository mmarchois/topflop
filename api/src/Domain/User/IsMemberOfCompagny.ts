import {User} from './User.entity';
import {Compagny} from '../Compagny/Compagny.entity';
import {IUserCompagnyRepository} from './Repository/IUserCompagnyRepository';
import {Inject} from '@nestjs/common';
import {UserCompagny} from './UserCompagny.entity';

export class IsMemberOfCompagny {
  constructor(
    @Inject('IUserCompagnyRepository')
    private readonly userCompagnyRepository: IUserCompagnyRepository
  ) {}

  public isSatisfiedBy = async (
    user: User,
    compagny: Compagny
  ): Promise<boolean> => {
    return (
      (await this.userCompagnyRepository.findOneByUserAndCompagny(
        user,
        compagny
      )) instanceof UserCompagny
    );
  };
}
