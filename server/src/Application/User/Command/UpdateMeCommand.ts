import { ICommand } from 'src/Application/ICommand';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';
import { User } from 'src/Domain/User/User.entity';

export class UpdateMeCommand implements ICommand {
  @ApiModelProperty()
  @IsNotEmpty()
  public firstName: string;

  @ApiModelProperty()
  @IsNotEmpty()
  public lastName: string;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  public user: User;
}
