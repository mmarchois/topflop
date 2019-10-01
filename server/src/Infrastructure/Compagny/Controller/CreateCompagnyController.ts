import { ApiBearerAuth, ApiUseTags, ApiOperation } from '@nestjs/swagger';
import { Controller, UseGuards, Post, Inject, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/Infrastructure/User/Decorator/LoggedUser';
import { ICommandBusAdapter } from 'src/Application/Adapter/ICommandBusAdapter';
import { CreateCompagnyCommand } from 'src/Application/Compagny/Command/CreateCompagnyCommand';
import { CompagnyView } from 'src/Application/Compagny/View/CompagnyView';
import { User } from 'src/Domain/User/User.entity';

@ApiBearerAuth()
@Controller('companies')
@ApiUseTags('Compagny')
@UseGuards(AuthGuard())
export class CreateCompagnyController {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
  ) {}

  @ApiOperation({ title: 'Create a compagny by the current logged user' })
  @Post()
  public async index(
    @Body() command: CreateCompagnyCommand,
    @LoggedUser() user: User,
  ): Promise<CompagnyView> {
    command.user = user;

    return await this.commandBus.execute(command);
  }
}
