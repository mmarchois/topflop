import { CommandHandler } from '@nestjs/cqrs';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { Inject } from '@nestjs/common';
import { UpdatePasswordCommand } from './UpdatePasswordCommand';
import { IEncryptionAdapter } from 'src/Application/Adapter/IEncryptionAdapter';

@CommandHandler(UpdatePasswordCommand)
export class UpdatePasswordCommandHandler {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('IEncryptionAdapter')
    private readonly encryptionAdapter: IEncryptionAdapter,
  ) {}

  public execute = async (command: UpdatePasswordCommand): Promise<void> => {
    const { password, user } = command;

    user.updatePassword(this.encryptionAdapter.hash(password));

    await this.userRepository.save(user);
  };
}
