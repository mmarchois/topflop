import 'dotenv/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { BusModule } from '../Common/BusModule';
import { RegisterController } from 'src/Infrastructure/Auth/Controller/RegisterController';
import { User } from 'src/Domain/User/User.entity';
import { RegisterCommandHandler } from 'src/Application/Auth/Command/RegisterCommandHandler';
import { UserRepository } from '../User/Repository/UserRepository';
import { CanUserRegister } from 'src/Domain/User/CanUserRegister';
import { EncryptionAdapter } from '../Adapter/EncryptionAdapter';
import { LoginController } from './Controller/LoginController';
import { LoginCommandHandler } from 'src/Application/Auth/Command/LoginCommandHandler';
import { TokenStrategy } from './Strategy/TokenStrategy';
import { UserCompagnyRepository } from '../User/Repository/UserCompagnyRepository';
import { UserCompagny } from 'src/Domain/User/UserCompagny.entity';

@Module({
  imports: [
    BusModule,
    JwtModule.register({
      secretOrPrivateKey: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES,
      },
    }),
    PassportModule.register({ defaultStrategy: 'bearer' }),
    TypeOrmModule.forFeature([User, UserCompagny]),
  ],
  controllers: [RegisterController, LoginController],
  providers: [
    { provide: 'IEncryptionAdapter', useClass: EncryptionAdapter },
    { provide: 'IUserRepository', useClass: UserRepository },
    { provide: 'IUserCompagnyRepository', useClass: UserCompagnyRepository },
    RegisterCommandHandler,
    LoginCommandHandler,
    CanUserRegister,
    TokenStrategy,
  ],
  exports: [PassportModule],
})
export class AuthModule {}
