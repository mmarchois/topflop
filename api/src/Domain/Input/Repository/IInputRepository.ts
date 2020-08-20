import {Input} from '../Input.entity';
import {Compagny} from 'src/Domain/Compagny/Compagny.entity';
import {InputFiltersDto} from 'src/Infrastructure/Input/Controller/Dto/InputFiltersDto';
import {User} from 'src/Domain/User/User.entity';

export interface IInputRepository {
  save(input: Input): Promise<Input>;
  findByCompagny(compagny: Compagny, filters: InputFiltersDto);
  canUserAddInput(author: User, addedBy: User, type: string): Promise<boolean>;
  deleteByUserAndCompagny(user: User, compagny: Compagny);
}
