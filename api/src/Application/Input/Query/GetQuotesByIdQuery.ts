import {IQuery} from 'src/Application/IQuery';
import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsUUID} from 'class-validator';
import {User} from 'src/Domain/User/User.entity';

export class GetQuotesByIdQuery implements IQuery {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  public id: string;

  public user: User;
}
