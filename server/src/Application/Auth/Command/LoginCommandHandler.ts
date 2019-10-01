import { CommandHandler } from '@nestjs/cqrs';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { LoginCommand } from './LoginCommand';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { IEncryptionAdapter } from 'src/Application/Adapter/IEncryptionAdapter';
import { User } from 'src/Domain/User/User.entity';
import { AuthenticatedView } from '../View/AuthenticatedView';
import { CompagnyView } from 'src/Application/Compagny/View/CompagnyView';
import { IUserCompagnyRepository } from 'src/Domain/User/Repository/IUserCompagnyRepository';

@CommandHandler(LoginCommand)
export class LoginCommandHandler {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IUserCompagnyRepository')
    private readonly userCompagnyRepository: IUserCompagnyRepository,
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

    const { currentCompagny } = user;
    let compagnyView = null;
    let role = null;

    if (currentCompagny) {
      const userCompagny = await this.userCompagnyRepository.findOneByUserAndCompagny(
        user,
        currentCompagny,
      );

      role = userCompagny.role;
      compagnyView = new CompagnyView(currentCompagny.id, currentCompagny.name);
    }

    return new AuthenticatedView(
      user.firstName,
      user.lastName,
      user.email,
      user.apiToken,
      role,
      compagnyView,
    );
  };
}
