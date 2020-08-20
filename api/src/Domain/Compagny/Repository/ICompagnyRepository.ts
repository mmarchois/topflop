import {Compagny} from '../Compagny.entity';

export interface ICompagnyRepository {
  save(compagny: Compagny): Promise<Compagny>;
  findOneById(id: string): Promise<Compagny | null>;
  findOneByName(name: string): Promise<Compagny | null>;
  findOneByVoucher(voucher: string): Promise<Compagny | null>;
}
