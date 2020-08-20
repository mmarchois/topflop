import {ICommand} from 'src/Application/ICommand';
import {User} from 'src/Domain/User/User.entity';
import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsEmail, IsEnum} from 'class-validator';
import {UserRole} from 'src/Domain/User/UserCompagny.entity';

export class CreateUserCommand implements ICommand {
  @ApiProperty()
  @IsNotEmpty()
  public firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  public lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(UserRole)
  public role: string;

  public user: User;
}
