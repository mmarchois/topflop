import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './Infrastructure/Auth/AuthModule';
import { UserModule } from './Infrastructure/User/UserModule';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, UserModule],
})
export class AppModule {}
