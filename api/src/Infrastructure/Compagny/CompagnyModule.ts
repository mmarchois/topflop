import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../Auth/AuthModule';
import { BusModule } from '../Common/BusModule';
import { Compagny } from 'src/Domain/Compagny/Compagny.entity';
import { CompagnyRepository } from './Repository/CompagnyRepository';
import { CreateCompagnyCommandHandler } from 'src/Application/Compagny/Command/CreateCompagnyCommandHandler';
import { CreateCompagnyController } from './Controller/CreateCompagnyController';
import { GetCompagnyByIdQueryHandler } from 'src/Application/Compagny/Query/GetCompagnyByIdQueryHandler';
import { GetCompaniesByUserController } from './Controller/GetCompaniesByUserController';
import { GetCompaniesByUserQueryHandler } from 'src/Application/Compagny/Query/GetCompaniesByUserQueryHandler';
import { UserCompagny } from 'src/Domain/User/UserCompagny.entity';
import { UserCompagnyRepository } from '../User/Repository/UserCompagnyRepository';
import { CodeGeneratorAdapter } from '../Adapter/CodeGeneratorAdapter';
import { JoinCompagnyController } from './Controller/JoinCompagnyController';
import { JoinCompagnyCommandHandler } from 'src/Application/Compagny/Command/JoinCompagnyCommandHandler';
import { IsMemberOfCompagny } from 'src/Domain/User/IsMemberOfCompagny';
import { LeaveCompagnyController } from './Controller/LeaveCompagnyController';
import { Input } from 'src/Domain/Input/Input.entity';
import { Quote } from 'src/Domain/Input/Quote.entity';
import { LeaveCompagnyCommandHandler } from 'src/Application/Compagny/Command/LeaveCompagnyCommandHandler';
import { InputRepository } from '../Input/Repository/InputRepository';
import { QuoteRepository } from '../Input/Repository/QuoteRepository';

@Module({
  imports: [
    BusModule,
    AuthModule,
    TypeOrmModule.forFeature([Compagny, UserCompagny, Input, Quote]),
  ],
  controllers: [
    CreateCompagnyController,
    GetCompaniesByUserController,
    JoinCompagnyController,
    LeaveCompagnyController,
  ],
  providers: [
    { provide: 'ICompagnyRepository', useClass: CompagnyRepository },
    { provide: 'IInputRepository', useClass: InputRepository },
    { provide: 'IQuoteRepository', useClass: QuoteRepository },
    { provide: 'IUserCompagnyRepository', useClass: UserCompagnyRepository },
    { provide: 'ICodeGeneratorAdapter', useClass: CodeGeneratorAdapter },
    CreateCompagnyCommandHandler,
    GetCompagnyByIdQueryHandler,
    GetCompaniesByUserQueryHandler,
    JoinCompagnyCommandHandler,
    IsMemberOfCompagny,
    LeaveCompagnyCommandHandler,
  ],
})
export class CompagnyModule {}
