import 'dotenv/config';
import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {BusModule} from '../Common/BusModule';
import {RegisterController} from 'src/Infrastructure/Auth/Controller/RegisterController';
import {User} from 'src/Domain/User/User.entity';
import {RegisterCommandHandler} from 'src/Application/Auth/Command/RegisterCommandHandler';
import {UserRepository} from '../User/Repository/UserRepository';
import {CanUserRegister} from 'src/Domain/User/CanUserRegister';
import {EncryptionAdapter} from '../Adapter/EncryptionAdapter';
import {LoginController} from './Controller/LoginController';
import {LoginCommandHandler} from 'src/Application/Auth/Command/LoginCommandHandler';
import {TokenStrategy} from './Strategy/TokenStrategy';
import {UserCompagnyRepository} from '../User/Repository/UserCompagnyRepository';
import {UserCompagny} from 'src/Domain/User/UserCompagny.entity';

@Module({
  imports: [BusModule, TypeOrmModule.forFeature([User, UserCompagny])],
  controllers: [RegisterController, LoginController],
  providers: [
    {provide: 'IEncryptionAdapter', useClass: EncryptionAdapter},
    {provide: 'IUserRepository', useClass: UserRepository},
    {provide: 'IUserCompagnyRepository', useClass: UserCompagnyRepository},
    RegisterCommandHandler,
    LoginCommandHandler,
    CanUserRegister,
    TokenStrategy
  ]
})
export class AuthModule {}
