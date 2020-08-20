import {ApiTags, ApiOperation, ApiBearerAuth} from '@nestjs/swagger';
import {Controller, UseGuards, Put, Body, Inject} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {ICommandBusAdapter} from 'src/Application/Adapter/ICommandBusAdapter';
import {LoggedUser} from 'src/Infrastructure/User/Decorator/LoggedUser';
import {User} from 'src/Domain/User/User.entity';
import {UpdatePasswordCommand} from 'src/Application/User/Command/UpdatePasswordCommand';

@ApiBearerAuth()
@Controller('users')
@ApiTags('User')
@UseGuards(AuthGuard('bearer'))
export class UpdatePasswordController {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter
  ) {}

  @ApiOperation({summary: 'Update logged user password'})
  @Put('/me/password')
  public async index(
    @Body() command: UpdatePasswordCommand,
    @LoggedUser() user: User
  ): Promise<void> {
    command.user = user;

    await this.commandBus.execute(command);
  }
}
