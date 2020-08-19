import { CommandHandler } from '@nestjs/cqrs';
import { Inject, BadRequestException } from '@nestjs/common';
import { RegisterCommand } from './RegisterCommand';
import { CanUserRegister } from 'src/Domain/User/CanUserRegister';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { IEncryptionAdapter } from 'src/Application/Adapter/IEncryptionAdapter';
import { User } from 'src/Domain/User/User.entity';
import { UserView } from 'src/Application/User/View/UserView';
import { AuthenticatedView } from '../View/AuthenticatedView';

@CommandHandler(RegisterCommand)
export class RegisterCommandHandler {
  constructor(
    private readonly canUserRegister: CanUserRegister,
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IEncryptionAdapter')
    private readonly encryptionAdapter: IEncryptionAdapter,
  ) {}

  public execute = async (
    command: RegisterCommand,
  ): Promise<AuthenticatedView> => {
    const { password, firstName, lastName } = command;
    const email = command.email.toLowerCase();

    if (false === (await this.canUserRegister.isSatisfiedBy(email))) {
      throw new BadRequestException('user.errors.alreadyRegistred');
    }

    const encryptedPassword = await this.encryptionAdapter.hash(password);
    const apiToken = await this.encryptionAdapter.hash(
      email + Date.now().toString(),
    );

    const user = new User({
      firstName,
      lastName,
      email,
      apiToken,
      password: encryptedPassword,
    });

    await this.userRepository.save(user);

    return new AuthenticatedView(new UserView(user), apiToken);
  };
}
