import {IQuery} from 'src/Application/IQuery';
import {ApiProperty} from '@nestjs/swagger';
import {IsUUID, IsNotEmpty} from 'class-validator';

export class GetCompagnyByIdQuery implements IQuery {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  public id: string;
}
