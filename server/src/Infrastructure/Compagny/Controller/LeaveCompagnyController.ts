import { ApiBearerAuth, ApiUseTags, ApiOperation } from '@nestjs/swagger';
import {
  Controller,
  UseGuards,
  Inject,
  Delete,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/Infrastructure/User/Decorator/LoggedUser';
import { ICommandBusAdapter } from 'src/Application/Adapter/ICommandBusAdapter';
import { User } from 'src/Domain/User/User.entity';
import { LeaveCompagnyCommand } from 'src/Application/Compagny/Command/LeaveCompagnyCommand';
import { GetCompagnyByIdQuery } from 'src/Application/Compagny/Query/GetCompagnyByIdQuery';
import { IQueryBusAdapter } from 'src/Application/Adapter/IQueryBusAdapter';
import { Compagny } from 'src/Domain/Compagny/Compagny.entity';

@ApiBearerAuth()
@Controller('companies')
@ApiUseTags('Compagny')
@UseGuards(AuthGuard())
export class LeaveCompagnyController {
  constructor(
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter,
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
  ) {}

  @ApiOperation({ title: 'Leave a compagny by the current logged user' })
  @Delete(':id/leave')
  public async index(
    @Param() query: GetCompagnyByIdQuery,
    @LoggedUser() user: User,
  ): Promise<void> {
    const compagny = await this.queryBus.execute(query);
    if (!(compagny instanceof Compagny)) {
      throw new BadRequestException('compagny.errors.notFound');
    }

    await this.commandBus.execute(new LeaveCompagnyCommand(compagny, user));
  }
}
