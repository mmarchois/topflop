import { ApiUseTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Controller, UseGuards, Put, Body, Inject } from '@nestjs/common';
import { ICommandBusAdapter } from 'src/Application/Adapter/ICommandBusAdapter';
import { LoggedUser } from 'src/Infrastructure/User/Decorator/LoggedUser';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/Domain/User/User.entity';
import { UpdateMeCommand } from 'src/Application/User/Command/UpdateMeCommand';
import { UpdatedMeView } from 'src/Application/User/View/UpdatedMeView';

@ApiBearerAuth()
@Controller('users')
@ApiUseTags('User')
@UseGuards(AuthGuard())
export class UpdateMeController {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
  ) {}

  @ApiOperation({ title: 'Update logged user' })
  @Put('/me')
  public async index(
    @Body() command: UpdateMeCommand,
    @LoggedUser() user: User,
  ): Promise<UpdatedMeView> {
    command.user = user;

    return await this.commandBus.execute(command);
  }
}
