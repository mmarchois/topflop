import { IInputRepository } from 'src/Domain/Input/Repository/IInputRepository';
import { Input } from 'src/Domain/Input/Input.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InputRepository implements IInputRepository {
  constructor(
    @InjectRepository(Input)
    private readonly repository: Repository<Input>,
  ) {}

  public save = async (input: Input): Promise<Input> => {
    return await this.repository.save(input);
  };
}
