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
import {CreateQuoteCommand} from 'src/Application/Input/Command/CreateQuoteCommand';
import {QuoteView} from 'src/Application/Input/View/QuoteView';

@ApiBearerAuth()
@Controller('users/me/current-compagny')
@ApiTags('User')
@UseGuards(AuthGuard('bearer'))
export class CreateQuoteController {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter
  ) {}

  @ApiOperation({summary: 'Create a quote by the current logged user'})
  @Post('quotes')
  public async index(
    @Body() command: CreateQuoteCommand,
    @LoggedUser() user: User
  ): Promise<QuoteView> {
    if (!user.currentCompagny) {
      throw new BadRequestException('user.errors.noCompagny');
    }

    command.user = user;

    return await this.commandBus.execute(command);
  }
}
