import {ICommand} from 'src/Application/ICommand';
import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsEmail} from 'class-validator';
import {User} from 'src/Domain/User/User.entity';

export class UpdateMeCommand implements ICommand {
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

  public user: User;
}
