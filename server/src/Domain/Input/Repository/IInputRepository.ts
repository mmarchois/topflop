import { Input } from '../Input.entity';
import { Compagny } from 'src/Domain/Compagny/Compagny.entity';
import { InputFiltersDto } from 'src/Infrastructure/Input/Controller/Dto/InputFiltersDto';

export interface IInputRepository {
  save(input: Input): Promise<Input>;
  findByCompagny(compagny: Compagny, filters: InputFiltersDto);
}
