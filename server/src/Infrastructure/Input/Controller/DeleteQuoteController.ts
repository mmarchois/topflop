import { ApiBearerAuth, ApiUseTags, ApiOperation } from '@nestjs/swagger';
import {
  Controller,
  UseGuards,
  Inject,
  BadRequestException,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/Infrastructure/User/Decorator/LoggedUser';
import { User } from 'src/Domain/User/User.entity';
import { GetQuotesByIdQuery } from 'src/Application/Input/Query/GetQuotesByIdQuery';
import { ICommandBusAdapter } from 'src/Application/Adapter/ICommandBusAdapter';
import { DeleteQuoteCommand } from 'src/Application/Input/Command/DeleteQuoteCommand';

@ApiBearerAuth()
@Controller('quotes')
@ApiUseTags('Quote')
@UseGuards(AuthGuard())
export class DeleteQuoteController {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
  ) {}

  @ApiOperation({ title: 'Delete a quote by the current logged user' })
  @Delete(':id')
  public async index(
    @Param() query: GetQuotesByIdQuery,
    @LoggedUser() user: User,
  ): Promise<void> {
    if (!user.currentCompagny) {
      throw new BadRequestException('user.errors.noCompagny');
    }

    query.user = user;

    await this.commandBus.execute(new DeleteQuoteCommand(query));
  }
}
