import {CommandHandler} from '@nestjs/cqrs';
import {Inject, BadRequestException} from '@nestjs/common';
import {CreateCompagnyCommand} from './CreateCompagnyCommand';
import {ICompagnyRepository} from 'src/Domain/Compagny/Repository/ICompagnyRepository';
import {Compagny} from 'src/Domain/Compagny/Compagny.entity';
import {ICommandBusAdapter} from 'src/Application/Adapter/ICommandBusAdapter';
import {CompagnyView} from '../View/CompagnyView';
import {CreateUserCompagnyCommand} from 'src/Application/User/Command/CreateUserCompagnyCommand';
import {UserRole} from 'src/Domain/User/UserCompagny.entity';
import {ChangeCurrentCompagnyCommand} from 'src/Application/User/Command/ChangeCurrentCompagnyCommand';
import {ICodeGeneratorAdapter} from 'src/Application/Adapter/ICodeGenerator';

@CommandHandler(CreateCompagnyCommand)
export class CreateCompagnyCommandHandler {
  constructor(
    @Inject('ICompagnyRepository')
    private readonly compagnyRepository: ICompagnyRepository,
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
    @Inject('ICodeGeneratorAdapter')
    private readonly codeGenerator: ICodeGeneratorAdapter
  ) {}

  public execute = async (
    command: CreateCompagnyCommand
  ): Promise<CompagnyView> => {
    const {name, user} = command;

    if (
      (await this.compagnyRepository.findOneByName(name)) instanceof Compagny
    ) {
      throw new BadRequestException('compagny.errors.alreadyExist');
    }

    const voucher = this.codeGenerator.generate();
    const compagny = await this.compagnyRepository.save(
      new Compagny({name, voucher})
    );

    await this.commandBus.execute(
      new CreateUserCompagnyCommand(user, compagny, UserRole.ADMIN)
    );

    const changeCurrentView = await this.commandBus.execute(
      new ChangeCurrentCompagnyCommand(user, compagny)
    );

    return changeCurrentView.compagny;
  };
}
