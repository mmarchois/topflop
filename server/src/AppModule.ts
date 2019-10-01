import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './Infrastructure/Auth/AuthModule';
import { UserModule } from './Infrastructure/User/UserModule';
import { CompagnyModule } from './Infrastructure/Compagny/CompagnyModule';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, UserModule, CompagnyModule],
})
export class AppModule {}
