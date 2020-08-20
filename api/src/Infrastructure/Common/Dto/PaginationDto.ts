import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsNumberString} from 'class-validator';

export abstract class PaginationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  public readonly page: number = 1;
}
