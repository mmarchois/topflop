import {CommandHandler} from '@nestjs/cqrs';
import {Inject, BadRequestException} from '@nestjs/common';
import {ICompagnyRepository} from 'src/Domain/Compagny/Repository/ICompagnyRepository';
import {Compagny} from 'src/Domain/Compagny/Compagny.entity';
import {ICommandBusAdapter} from 'src/Application/Adapter/ICommandBusAdapter';
import {CompagnyView} from '../View/CompagnyView';
import {CreateUserCompagnyCommand} from 'src/Application/User/Command/CreateUserCompagnyCommand';
import {UserRole} from 'src/Domain/User/UserCompagny.entity';
import {ChangeCurrentCompagnyCommand} from 'src/Application/User/Command/ChangeCurrentCompagnyCommand';
import {JoinCompagnyCommand} from './JoinCompagnyCommand';
import {IsMemberOfCompagny} from 'src/Domain/User/IsMemberOfCompagny';

@CommandHandler(JoinCompagnyCommand)
export class JoinCompagnyCommandHandler {
  constructor(
    @Inject('ICompagnyRepository')
    private readonly compagnyRepository: ICompagnyRepository,
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
    private readonly isMemberOfCompagny: IsMemberOfCompagny
  ) {}

  public execute = async (
    command: JoinCompagnyCommand
  ): Promise<CompagnyView> => {
    const {voucher, user} = command;

    const compagny = await this.compagnyRepository.findOneByVoucher(voucher);
    if (!(compagny instanceof Compagny)) {
      throw new BadRequestException('compagny.errors.notFound');
    }

    if (
      true === (await this.isMemberOfCompagny.isSatisfiedBy(user, compagny))
    ) {
      throw new BadRequestException('compagny.errors.alreadyRegistred');
    }

    await this.commandBus.execute(
      new CreateUserCompagnyCommand(user, compagny, UserRole.USER)
    );

    const changeCurrentView = await this.commandBus.execute(
      new ChangeCurrentCompagnyCommand(user, compagny)
    );

    return changeCurrentView.compagny;
  };
}
