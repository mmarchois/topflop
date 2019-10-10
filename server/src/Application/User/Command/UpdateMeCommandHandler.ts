import { CommandHandler } from '@nestjs/cqrs';
import { UpdateMeCommand } from './UpdateMeCommand';
import { IUserRepository } from 'src/Domain/User/Repository/IUserRepository';
import { Inject, BadRequestException } from '@nestjs/common';
import { User } from 'src/Domain/User/User.entity';
import { UpdatedMeView } from '../View/UpdatedMeView';

@CommandHandler(UpdateMeCommand)
export class UpdateMeCommandHandler {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  public execute = async (command: UpdateMeCommand): Promise<UpdatedMeView> => {
    const { firstName, lastName, user } = command;
    const email = command.email.toLowerCase();

    if (
      email !== user.email &&
      (await this.userRepository.findOneByEmail(email)) instanceof User
    ) {
      throw new BadRequestException('user.errors.emailAlreadyUsed');
    }

    user.update(firstName, lastName, email);
    await this.userRepository.save(user);

    return new UpdatedMeView(firstName, lastName, email);
  };
}
