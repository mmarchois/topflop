import { CommandHandler, ICommandBus } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateCompagnyCommand } from './CreateCompagnyCommand';
import { ICompagnyRepository } from 'src/Domain/Compagny/Repository/ICompagnyRepository';
import { Compagny } from 'src/Domain/Compagny/Compagny.entity';
import { ICommandBusAdapter } from 'src/Application/Adapter/ICommandBusAdapter';
import { CompagnyView } from '../View/CompagnyView';
import { CreateUserCompagnyCommand } from 'src/Application/User/Command/CreateUserCompagnyCommand';
import { UserRole } from 'src/Domain/User/UserCompagny.entity';
import { ChangeCurrentCompagnyCommand } from 'src/Application/User/Command/ChangeCurrentCompagnyCommand';

@CommandHandler(CreateCompagnyCommand)
export class CreateCompagnyCommandHandler {
  constructor(
    @Inject('ICompagnyRepository')
    private readonly compagnyRepository: ICompagnyRepository,
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
  ) {}

  public execute = async (
    command: CreateCompagnyCommand,
  ): Promise<CompagnyView> => {
    const { name, user } = command;
    const compagny = await this.compagnyRepository.save(new Compagny({ name }));

    await this.commandBus.execute(
      new CreateUserCompagnyCommand(user, compagny, UserRole.ADMIN),
    );

    const changeCurrentView = await this.commandBus.execute(
      new ChangeCurrentCompagnyCommand(user, compagny),
    );

    return changeCurrentView.compagny;
  };
}
