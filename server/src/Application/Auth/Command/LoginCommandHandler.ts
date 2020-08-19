import { CommandHandler } from '@nestjs/cqrs';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { LoginCommand } from './LoginCommand';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { IEncryptionAdapter } from 'src/Application/Adapter/IEncryptionAdapter';
import { User } from 'src/Domain/User/User.entity';
import { IUserCompagnyRepository } from 'src/Domain/User/Repository/IUserCompagnyRepository';
import { UserView } from 'src/Application/User/View/UserView';
import { AuthenticatedView } from '../View/AuthenticatedView';

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
    const user = await this.userRepository.findOneByEmail(
      command.email.toLowerCase(),
    );

    if (
      !(user instanceof User) ||
      false ===
        (await this.encryptionAdapter.compare(command.password, user.password))
    ) {
      throw new UnauthorizedException();
    }

    const { currentCompagny } = user;
    let role = null;

    if (currentCompagny) {
      // Used to retrieve the user role in this compagny
      const userCompagny = await this.userCompagnyRepository.findOneByUserAndCompagny(
        user,
        currentCompagny,
      );

      role = userCompagny.role;
    }

    return new AuthenticatedView(
      new UserView(user, currentCompagny, role),
      user.apiToken,
    );
  };
}
