import {CommandBus} from '@nestjs/cqrs';
import {ICommandBusAdapter} from 'src/Application/Adapter/ICommandBusAdapter';
import {ICommand} from 'src/Application/ICommand';
import {Injectable} from '@nestjs/common';

@Injectable()
export class CommandBusAdapter implements ICommandBusAdapter {
  constructor(private readonly commandBus: CommandBus) {}

  public execute = (command: ICommand): any => {
    return this.commandBus.execute(command);
  };
}
