import {ICommand} from 'src/Application/ICommand';
import {IsNotEmpty, IsEmail} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class LoginCommand implements ICommand {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  public email: string;

  @IsNotEmpty()
  @ApiProperty()
  public password: string;
}
