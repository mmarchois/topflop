import 'dotenv/config';
import { CommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './CreateUserCommand';
import { IUserCompagnyRepository } from 'src/Domain/User/Repository/IUserCompagnyRepository';
import {
  Inject,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { IEncryptionAdapter } from 'src/Application/Adapter/IEncryptionAdapter';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { User } from 'src/Domain/User/User.entity';
import { UserCompagny } from 'src/Domain/User/UserCompagny.entity';
import { IsAdminOfCompagny } from 'src/Domain/User/IsAdminOfCompagny';
import { UserView } from '../View/UserView';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IEncryptionAdapter')
    private readonly encryptionAdapter: IEncryptionAdapter,
    @Inject('IUserCompagnyRepository')
    private readonly userCompagnyRepository: IUserCompagnyRepository,
    private readonly isAdminOfCompagny: IsAdminOfCompagny,
  ) {}

  public execute = async (command: CreateUserCommand): Promise<UserView> => {
    const { firstName, lastName, user, role } = command;
    const compagny = user.currentCompagny;
    const email = command.email.toLowerCase();

    if (
      false === (await this.isAdminOfCompagny.isSatisfiedBy(user, compagny))
    ) {
      throw new ForbiddenException();
    }

    if (
      (await this.userCompagnyRepository.findOneByEmailAndCompagny(
        email,
        compagny,
      )) instanceof UserCompagny
    ) {
      throw new BadRequestException('user.errors.registredCompagny');
    }

    let savedUser = await this.userRepository.findOneByEmail(email);

    if (!(savedUser instanceof User)) {
      const defaultPassword = process.env.DEFAULT_PASSWORD;
      const encryptedPassword = this.encryptionAdapter.hash(defaultPassword);
      const apiToken = this.encryptionAdapter.hash(
        email + Date.now().toString(),
      );

      savedUser = new User({
        firstName,
        lastName,
        email,
        apiToken,
        currentCompagny: compagny,
        password: encryptedPassword,
      });

      await this.userRepository.save(savedUser);
    }

    await this.userCompagnyRepository.save(
      new UserCompagny({
        user: savedUser,
        compagny,
        role,
      }),
    );

    return new UserView(savedUser, compagny, role);
  };
}
