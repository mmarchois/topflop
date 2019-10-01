import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ICommand } from 'src/Application/ICommand';
import { User } from 'src/Domain/User/User.entity';

export class CreateCompagnyCommand implements ICommand {
  @ApiModelProperty()
  @IsNotEmpty()
  public name: string;
  public user: User;
}
