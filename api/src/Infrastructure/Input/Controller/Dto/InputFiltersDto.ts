import {IsNotEmpty, IsEnum, IsDateString} from 'class-validator';
import {InputType} from 'src/Domain/Input/Input.entity';
import {ApiProperty} from '@nestjs/swagger';

export class InputFiltersDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(InputType)
  public type: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  public readonly fromDate: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  public readonly toDate: string;
}
