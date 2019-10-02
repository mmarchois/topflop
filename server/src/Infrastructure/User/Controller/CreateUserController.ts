import { ApiBearerAuth, ApiUseTags, ApiOperation } from '@nestjs/swagger';
import {
  Controller,
  UseGuards,
  Post,
  Inject,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/Infrastructure/User/Decorator/LoggedUser';
import { ICommandBusAdapter } from 'src/Application/Adapter/ICommandBusAdapter';
import { User } from 'src/Domain/User/User.entity';
import { IQueryBusAdapter } from 'src/Application/Adapter/IQueryBusAdapter';
import { GetCompagnyByIdQuery } from 'src/Application/Compagny/Query/GetCompagnyByIdQuery';
import { Compagny } from 'src/Domain/Compagny/Compagny.entity';
import { CreateUserCommand } from 'src/Application/User/Command/CreateUserCommand';
import { UserView } from 'src/Application/User/View/UserView';

@ApiBearerAuth()
@Controller('companies')
@ApiUseTags('Compagny')
@UseGuards(AuthGuard())
export class CreateUserController {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter,
  ) {}

  @ApiOperation({
    title: 'Create a user in the defined compagny by the current logged user',
  })
  @Post(':id/users')
  public async index(
    @Body() command: CreateUserCommand,
    @Param() query: GetCompagnyByIdQuery,
    @LoggedUser() user: User,
  ): Promise<UserView> {
    const compagny = await this.queryBus.execute(query);
    if (!(compagny instanceof Compagny)) {
      throw new NotFoundException('compagny.not.found');
    }

    command.user = user;
    command.compagny = compagny;

    return await this.commandBus.execute(command);
  }
}
