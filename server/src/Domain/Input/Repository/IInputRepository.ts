import { Input } from '../Input.entity';

export interface IInputRepository {
  save(input: Input): Promise<Input>;
}
