import { IQuery } from 'src/Application/IQuery';
import { Compagny } from 'src/Domain/Compagny/Compagny.entity';
import { QuoteFiltersDto } from 'src/Infrastructure/Input/Controller/Dto/QuoteFiltersDto';

export class GetQuotesByCompagnyQuery implements IQuery {
  constructor(
    public readonly compagny: Compagny,
    public readonly filters: QuoteFiltersDto,
  ) {}
}
