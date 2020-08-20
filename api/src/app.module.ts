import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthModule} from './Infrastructure/Auth/AuthModule';
import {UserModule} from './Infrastructure/User/UserModule';
import {CompagnyModule} from './Infrastructure/Compagny/CompagnyModule';
import {InputModule} from './Infrastructure/Input/InputModule';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AuthModule,
    UserModule,
    CompagnyModule,
    InputModule
  ]
})
export class AppModule {}
