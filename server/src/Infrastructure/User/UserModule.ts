import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../Auth/AuthModule';
import { BusModule } from '../Common/BusModule';
import { User } from 'src/Domain/User/User.entity';
import { UserRepository } from './Repository/UserRepository';
import { GetUserByApiTokenHandler } from 'src/Application/User/Query/GetUserByApiTokenQueryHandler';
import { UserCompagny } from 'src/Domain/User/UserCompagny.entity';
import { UserCompagnyRepository } from './Repository/UserCompagnyRepository';
import { ChangeCurrentCompagnyCommandHandler } from 'src/Application/User/Command/ChangeCurrentCompagnyCommandHandler';
import { CreateUserCompagnyCommandHandler } from 'src/Application/User/Command/CreateUserCompagnyCommandHandler';
import { IsMemberOfCompagny } from 'src/Domain/User/IsMemberOfCompagny';

@Module({
  imports: [
    BusModule,
    AuthModule,
    TypeOrmModule.forFeature([User, UserCompagny]),
  ],
  controllers: [],
  providers: [
    { provide: 'IUserRepository', useClass: UserRepository },
    { provide: 'IUserCompagnyRepository', useClass: UserCompagnyRepository },
    GetUserByApiTokenHandler,
    ChangeCurrentCompagnyCommandHandler,
    CreateUserCompagnyCommandHandler,
    IsMemberOfCompagny,
  ],
})
export class UserModule {}
