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
import { GetQuotesByCompagnyController } from './Controller/GetQuotesByCompagnyController';
import { GetQuotesByCompagnyQueryHandler } from 'src/Application/Input/Query/GetQuotesByCompagnyQueryHandler';
import { CreateInputController } from './Controller/CreateInputController';
import { CreateInputCommandHandler } from 'src/Application/Input/Command/CreateInputCommandHandler';
import { GetInputsByCompagnyController } from './Controller/GetInputsByCompagnyController';
import { GetInputsByCompagnyQueryHandler } from 'src/Application/Input/Query/GetInputsByCompagnyQueryHandler';
import { GetQuoteController } from './Controller/GetQuoteController';
import { GetQuotesByIdQueryHandler } from 'src/Application/Input/Query/GetQuotesByIdQueryHandler';
import { DeleteQuoteCommandHandler } from 'src/Application/Input/Command/DeleteQuoteCommandHandler';
import { DeleteQuoteController } from './Controller/DeleteQuoteController';
import { IsAdminOfCompagny } from 'src/Domain/User/IsAdminOfCompagny';
import { NotifierAdapter } from '../Adapter/NotifierAdapter';
import { InputNotifier } from 'src/Domain/Input/Notifier/InputNotifier';

@Module({
  imports: [
    BusModule,
    AuthModule,
    TypeOrmModule.forFeature([Input, Quote, User, UserCompagny]),
  ],
  controllers: [
    CreateQuoteController,
    GetQuotesByCompagnyController,
    CreateInputController,
    GetInputsByCompagnyController,
    GetQuoteController,
    DeleteQuoteController,
  ],
  providers: [
    { provide: 'IQuoteRepository', useClass: QuoteRepository },
    { provide: 'IInputRepository', useClass: InputRepository },
    { provide: 'IUserCompagnyRepository', useClass: UserCompagnyRepository },
    { provide: 'IUserRepository', useClass: UserRepository },
    { provide: 'INotifierAdapter', useClass: NotifierAdapter },

    IsMemberOfCompagny,
    IsAdminOfCompagny,
    CreateQuoteCommandHandler,
    GetQuotesByCompagnyQueryHandler,
    CreateInputCommandHandler,
    GetInputsByCompagnyQueryHandler,
    GetQuotesByIdQueryHandler,
    DeleteQuoteCommandHandler,
    InputNotifier,
  ],
})
export class InputModule {}
