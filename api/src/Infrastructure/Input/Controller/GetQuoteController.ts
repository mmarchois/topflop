import {ApiBearerAuth, ApiTags, ApiOperation} from '@nestjs/swagger';
import {
  Controller,
  UseGuards,
  Inject,
  BadRequestException,
  Param,
  Get
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {LoggedUser} from 'src/Infrastructure/User/Decorator/LoggedUser';
import {User} from 'src/Domain/User/User.entity';
import {IQueryBusAdapter} from 'src/Application/Adapter/IQueryBusAdapter';
import {GetQuotesByIdQuery} from 'src/Application/Input/Query/GetQuotesByIdQuery';
import {QuoteView} from 'src/Application/Input/View/QuoteView';

@ApiBearerAuth()
@Controller('quotes')
@ApiTags('Quote')
@UseGuards(AuthGuard('bearer'))
export class GetQuoteController {
  constructor(
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter
  ) {}

  @ApiOperation({summary: 'Get a quote by the current logged user'})
  @Get(':id/detail')
  public async index(
    @Param() query: GetQuotesByIdQuery,
    @LoggedUser() user: User
  ): Promise<QuoteView> {
    if (!user.currentCompagny) {
      throw new BadRequestException('user.errors.noCompagny');
    }

    query.user = user;

    return await this.queryBus.execute(query);
  }
}
