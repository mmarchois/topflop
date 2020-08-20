import {IQuery} from 'src/Application/IQuery';
import {Compagny} from 'src/Domain/Compagny/Compagny.entity';
import {InputFiltersDto} from 'src/Infrastructure/Input/Controller/Dto/InputFiltersDto';

export class GetInputsByCompagnyQuery implements IQuery {
  constructor(
    public readonly compagny: Compagny,
    public readonly filters: InputFiltersDto
  ) {}
}
