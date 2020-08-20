import {ApiBearerAuth, ApiTags, ApiOperation} from '@nestjs/swagger';
import {
  Controller,
  UseGuards,
  Post,
  Inject,
  Body,
  BadRequestException
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {LoggedUser} from 'src/Infrastructure/User/Decorator/LoggedUser';
import {ICommandBusAdapter} from 'src/Application/Adapter/ICommandBusAdapter';
import {User} from 'src/Domain/User/User.entity';
import {CreateInputCommand} from 'src/Application/Input/Command/CreateInputCommand';
import {InputView} from 'src/Application/Input/View/InputView';

@ApiBearerAuth()
@Controller('users/me/current-compagny')
@ApiTags('User')
@UseGuards(AuthGuard('bearer'))
export class CreateInputController {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter
  ) {}

  @ApiOperation({summary: 'Create an input by the current logged user'})
  @Post('inputs')
  public async index(
    @Body() command: CreateInputCommand,
    @LoggedUser() user: User
  ): Promise<InputView> {
    if (!user.currentCompagny) {
      throw new BadRequestException('user.errors.noCompagny');
    }

    command.user = user;

    return await this.commandBus.execute(command);
  }
}
