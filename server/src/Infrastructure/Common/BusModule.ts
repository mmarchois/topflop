import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandBusAdapter } from 'src/Infrastructure/Adapter/CommandBusAdapter';
import { QueryBusAdapter } from 'src/Infrastructure/Adapter/QueryBusAdapter';

const providers = [
  { provide: 'ICommandBusAdapter', useClass: CommandBusAdapter },
  { provide: 'IQueryBusAdapter', useClass: QueryBusAdapter },
];

@Module({
  imports: [CqrsModule],
  providers: [...providers],
  exports: [...providers],
})
export class BusModule {}
