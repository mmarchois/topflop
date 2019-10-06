import { ApiBearerAuth, ApiUseTags, ApiOperation } from '@nestjs/swagger';
import {
  Controller,
  UseGuards,
  Post,
  Inject,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/Infrastructure/User/Decorator/LoggedUser';
import { ICommandBusAdapter } from 'src/Application/Adapter/ICommandBusAdapter';
import { User } from 'src/Domain/User/User.entity';
import { IQueryBusAdapter } from 'src/Application/Adapter/IQueryBusAdapter';
import { CreateUserCommand } from 'src/Application/User/Command/CreateUserCommand';
import { UserView } from 'src/Application/User/View/UserView';

@ApiBearerAuth()
@Controller('users/me/current-compagny')
@ApiUseTags('User')
@UseGuards(AuthGuard())
export class CreateUserController {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter,
  ) {}

  @ApiOperation({
    title: 'Create a user in the current logged user compagny',
  })
  @Post('/users')
  public async index(
    @Body() command: CreateUserCommand,
    @LoggedUser() user: User,
  ): Promise<UserView> {
    if (!user.currentCompagny) {
      throw new BadRequestException('user.has.not.compagny');
    }

    command.user = user;

    return await this.commandBus.execute(command);
  }
}
