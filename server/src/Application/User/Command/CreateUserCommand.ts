import { ICommand } from 'src/Application/ICommand';
import { User } from 'src/Domain/User/User.entity';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsEnum } from 'class-validator';
import { UserRole } from 'src/Domain/User/UserCompagny.entity';

export class CreateUserCommand implements ICommand {
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

  @ApiModelProperty()
  @IsNotEmpty()
  @IsEnum(UserRole)
  public role: string;

  public user: User;
}
