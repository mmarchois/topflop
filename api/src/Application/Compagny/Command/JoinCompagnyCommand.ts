import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';
import {ICommand} from 'src/Application/ICommand';
import {User} from 'src/Domain/User/User.entity';

export class JoinCompagnyCommand implements ICommand {
  @ApiProperty()
  @IsNotEmpty()
  public voucher: string;
  public user: User;
}
