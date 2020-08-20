import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsUUID, IsEnum} from 'class-validator';
import {ICommand} from 'src/Application/ICommand';
import {User} from 'src/Domain/User/User.entity';
import {InputType} from 'src/Domain/Input/Input.entity';

export class CreateInputCommand implements ICommand {
  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(InputType)
  public type: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  public authorId: string;

  public user: User;
}
