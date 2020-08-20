import {ApiBearerAuth, ApiTags, ApiOperation} from '@nestjs/swagger';
import {
  Controller,
  UseGuards,
  Inject,
  Get,
  BadRequestException,
  Query
} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';
import {LoggedUser} from 'src/Infrastructure/User/Decorator/LoggedUser';
import {User} from 'src/Domain/User/User.entity';
import {IQueryBusAdapter} from 'src/Application/Adapter/IQueryBusAdapter';
import {GetQuotesByCompagnyQuery} from 'src/Application/Input/Query/GetQuotesByCompagnyQuery';
import {QuoteFiltersDto} from './Dto/QuoteFiltersDto';
import {QuoteView} from 'src/Application/Input/View/QuoteView';
import {Pagination} from 'src/Application/Common/Pagination';

@ApiBearerAuth()
@Controller('users/me/current-compagny')
@ApiTags('User')
@UseGuards(AuthGuard('bearer'))
export class GetQuotesByCompagnyController {
  constructor(
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter
  ) {}

  @ApiOperation({
    summary: 'Get compagny quotes by the logged user'
  })
  @Get('quotes')
  public async index(
    @Query() filters: QuoteFiltersDto,
    @LoggedUser() user: User
  ): Promise<Pagination<QuoteView>> {
    if (!user.currentCompagny) {
      throw new BadRequestException('user.errors.noCompagny');
    }

    return await this.queryBus.execute(
      new GetQuotesByCompagnyQuery(user.currentCompagny, filters)
    );
  }
}
