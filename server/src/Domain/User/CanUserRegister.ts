import { IUserRepository } from './Repository/IUserRepository';
import { Injectable, Inject } from '@nestjs/common';
import { User } from './User.entity';

@Injectable()
export class CanUserRegister {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  public isSatisfiedBy = async (email: string): Promise<boolean> => {
    return !((await this.userRepository.findOneByEmail(email)) instanceof User);
  };
}
