import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../Auth/AuthModule';
import { BusModule } from '../Common/BusModule';
import { Compagny } from 'src/Domain/Compagny/Compagny.entity';
import { CompagnyRepository } from './Repository/CompagnyRepository';
import { CreateCompagnyCommandHandler } from 'src/Application/Compagny/Command/CreateCompagnyCommandHandler';
import { CreateCompagnyController } from './Controller/CreateCompagnyController';

@Module({
  imports: [BusModule, AuthModule, TypeOrmModule.forFeature([Compagny])],
  controllers: [CreateCompagnyController],
  providers: [
    { provide: 'ICompagnyRepository', useClass: CompagnyRepository },
    CreateCompagnyCommandHandler,
  ],
})
export class CompagnyModule {}
