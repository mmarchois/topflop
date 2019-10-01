import { CommandHandler } from '@nestjs/cqrs';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { LoginCommand } from './LoginCommand';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { IEncryptionAdapter } from 'src/Application/Adapter/IEncryptionAdapter';
import { User } from 'src/Domain/User/User.entity';
import { AuthenticatedView } from '../View/AuthenticatedView';
import { CompagnyView } from 'src/Application/Compagny/View/CompagnyView';

@CommandHandler(LoginCommand)
export class LoginCommandHandler {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IEncryptionAdapter')
    private readonly encryptionAdapter: IEncryptionAdapter,
  ) {}

  public execute = async (
    command: LoginCommand,
  ): Promise<AuthenticatedView> => {
    const user = await this.userRepository.findOneByEmail(command.email);

    if (
      !(user instanceof User) ||
      false === this.encryptionAdapter.compare(command.password, user.password)
    ) {
      throw new UnauthorizedException();
    }

    return new AuthenticatedView(
      user.firstName,
      user.lastName,
      user.email,
      user.apiToken,
      user.currentCompagny
        ? new CompagnyView(user.currentCompagny.id, user.currentCompagny.name)
        : null,
    );
  };
}
