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
import { IsAdminOfCompagny } from 'src/Domain/User/IsAdminOfCompagny';
import { CreateUserController } from './Controller/CreateUserController';
import { CreateUserCommandHandler } from 'src/Application/User/Command/CreateUserCommandHandler';
import { EncryptionAdapter } from '../Adapter/EncryptionAdapter';

@Module({
  imports: [
    BusModule,
    AuthModule,
    TypeOrmModule.forFeature([User, UserCompagny]),
  ],
  controllers: [CreateUserController],
  providers: [
    { provide: 'IUserRepository', useClass: UserRepository },
    { provide: 'IUserCompagnyRepository', useClass: UserCompagnyRepository },
    { provide: 'IEncryptionAdapter', useClass: EncryptionAdapter },
    GetUserByApiTokenHandler,
    ChangeCurrentCompagnyCommandHandler,
    CreateUserCompagnyCommandHandler,
    IsMemberOfCompagny,
    IsAdminOfCompagny,
    CreateUserCommandHandler,
  ],
})
export class UserModule {}
