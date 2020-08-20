import {ICommand} from '../ICommand';

export interface ICommandBusAdapter {
  execute(command: ICommand): any;
}
