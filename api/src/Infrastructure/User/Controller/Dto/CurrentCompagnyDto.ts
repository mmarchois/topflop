import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsUUID} from 'class-validator';

export class CurrentCompagnyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  public compagny: string;
}
