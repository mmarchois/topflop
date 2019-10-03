import { IsNotEmpty, IsEnum, IsDateString } from 'class-validator';
import { InputType } from 'src/Domain/Input/Input.entity';
import { ApiModelProperty } from '@nestjs/swagger';

export class InputFiltersDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsEnum(InputType)
  public type: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsDateString()
  public readonly fromDate: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsDateString()
  public readonly toDate: string;
}
