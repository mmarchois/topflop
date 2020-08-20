import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';
import {ICommand} from 'src/Application/ICommand';
import {User} from 'src/Domain/User/User.entity';

export class CreateCompagnyCommand implements ICommand {
  @ApiProperty()
  @IsNotEmpty()
  public name: string;
  public user: User;
}
