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

@Module({
  imports: [
    BusModule,
    AuthModule,
    TypeOrmModule.forFeature([Compagny, UserCompagny]),
  ],
  controllers: [CreateCompagnyController, GetCompaniesByUserController],
  providers: [
    { provide: 'ICompagnyRepository', useClass: CompagnyRepository },
    { provide: 'IUserCompagnyRepository', useClass: UserCompagnyRepository },
    CreateCompagnyCommandHandler,
    GetCompagnyByIdQueryHandler,
    GetCompaniesByUserQueryHandler,
  ],
})
export class CompagnyModule {}
