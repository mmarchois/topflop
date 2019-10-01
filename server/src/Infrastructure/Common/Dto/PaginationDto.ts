import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export abstract class PaginationDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsNumberString()
  public readonly page: number = 1;
}
