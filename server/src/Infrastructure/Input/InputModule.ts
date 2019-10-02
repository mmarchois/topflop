import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../Auth/AuthModule';
import { BusModule } from '../Common/BusModule';
import { Input } from 'src/Domain/Input/Input.entity';
import { Quote } from 'src/Domain/Input/Quote.entity';
import { QuoteRepository } from './Repository/QuoteRepository';
import { InputRepository } from './Repository/InputRepository';
import { CreateQuoteController } from './Controller/CreateQuoteController';
import { CreateQuoteCommandHandler } from 'src/Application/Input/Command/CreateQuoteCommandHandler';
import { IsMemberOfCompagny } from 'src/Domain/User/IsMemberOfCompagny';
import { UserRepository } from '../User/Repository/UserRepository';
import { User } from 'src/Domain/User/User.entity';
import { UserCompagnyRepository } from '../User/Repository/UserCompagnyRepository';
import { UserCompagny } from 'src/Domain/User/UserCompagny.entity';

@Module({
  imports: [
    BusModule,
    AuthModule,
    TypeOrmModule.forFeature([Input, Quote, User, UserCompagny]),
  ],
  controllers: [CreateQuoteController],
  providers: [
    { provide: 'IQuoteRepository', useClass: QuoteRepository },
    { provide: 'IInputRepository', useClass: InputRepository },
    { provide: 'IUserCompagnyRepository', useClass: UserCompagnyRepository },
    { provide: 'IUserRepository', useClass: UserRepository },
    IsMemberOfCompagny,
    CreateQuoteCommandHandler,
  ],
})
export class InputModule {}
