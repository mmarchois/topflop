import { Compagny } from 'src/Domain/Compagny/Compagny.entity';

export interface INotifierAdapter {
  notify(compagny: Compagny, topic: string, payload: any): void;
}
