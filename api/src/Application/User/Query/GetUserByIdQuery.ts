import {IQuery} from 'src/Application/IQuery';
import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsUUID} from 'class-validator';

export class GetUserByIdQuery implements IQuery {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  public id: string;
}
