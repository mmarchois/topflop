import {IQuery} from '../IQuery';

export interface IQueryBusAdapter {
  execute(query: IQuery): any;
}
