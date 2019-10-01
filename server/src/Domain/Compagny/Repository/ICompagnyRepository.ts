import { Compagny } from '../Compagny.entity';

export interface ICompagnyRepository {
  save(compagny: Compagny): Promise<Compagny>;
}
