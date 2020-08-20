import {Quote} from '../Quote.entity';
import {Compagny} from 'src/Domain/Compagny/Compagny.entity';
import {QuoteFiltersDto} from 'src/Infrastructure/Input/Controller/Dto/QuoteFiltersDto';
import {User} from 'src/Domain/User/User.entity';

export interface IQuoteRepository {
  save(quote: Quote): Promise<Quote>;
  findById(id: string): Promise<Quote>;
  findByCompagny(
    compagny: Compagny,
    filters: QuoteFiltersDto
  ): Promise<[Quote[], number]>;
  deleteByUserAndCompagny(user: User, compagny: Compagny);
  delete(quote: Quote);
}
