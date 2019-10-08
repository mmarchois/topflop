import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CurrentCompagnyDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsUUID()
  public compagny: string;
}
