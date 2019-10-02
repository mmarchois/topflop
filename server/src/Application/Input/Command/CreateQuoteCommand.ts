import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { ICommand } from 'src/Application/ICommand';
import { User } from 'src/Domain/User/User.entity';

export class CreateQuoteCommand implements ICommand {
  @ApiModelProperty()
  @IsNotEmpty()
  public sentence: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsUUID()
  public authorId: string;

  public user: User;
}
