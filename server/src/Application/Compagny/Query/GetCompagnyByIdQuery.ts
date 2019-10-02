import { IQuery } from 'src/Application/IQuery';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';

export class GetCompagnyByIdQuery implements IQuery {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsUUID()
  public id: string;
}
