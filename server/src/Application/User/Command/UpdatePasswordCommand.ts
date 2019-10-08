import { ICommand } from 'src/Application/ICommand';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/Domain/User/User.entity';

export class UpdatePasswordCommand implements ICommand {
  @ApiModelProperty()
  @IsNotEmpty()
  public password: string;

  public user: User;
}
