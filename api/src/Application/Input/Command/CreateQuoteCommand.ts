import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsUUID} from 'class-validator';
import {ICommand} from 'src/Application/ICommand';
import {User} from 'src/Domain/User/User.entity';

export class CreateQuoteCommand implements ICommand {
  @ApiProperty()
  @IsNotEmpty()
  public sentence: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  public authorId: string;

  public user: User;
}
