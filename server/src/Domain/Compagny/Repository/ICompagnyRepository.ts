import { Compagny } from '../Compagny.entity';

export interface ICompagnyRepository {
  save(compagny: Compagny): Promise<Compagny>;
  findOneById(id: string): Promise<Compagny>;
}
