import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../Auth/AuthModule';
import { BusModule } from '../Common/BusModule';
import { User } from 'src/Domain/User/User.entity';
import { UserRepository } from './Repository/UserRepository';
import { GetUserByApiTokenHandler } from 'src/Application/User/Query/GetUserByApiTokenQueryHandler';

@Module({
  imports: [BusModule, AuthModule, TypeOrmModule.forFeature([User])],
  controllers: [],
  providers: [
    { provide: 'IUserRepository', useClass: UserRepository },
    GetUserByApiTokenHandler,
  ],
})
export class UserModule {}
