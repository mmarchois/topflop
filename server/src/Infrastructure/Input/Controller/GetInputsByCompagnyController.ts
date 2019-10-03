import { ApiBearerAuth, ApiUseTags, ApiOperation } from '@nestjs/swagger';
import {
  Controller,
  UseGuards,
  Inject,
  Get,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/Infrastructure/User/Decorator/LoggedUser';
import { User } from 'src/Domain/User/User.entity';
import { IQueryBusAdapter } from 'src/Application/Adapter/IQueryBusAdapter';
import { InputFiltersDto } from './Dto/InputFiltersDto';
import { GetInputsByCompagnyQuery } from 'src/Application/Input/Query/GetInputsByCompagnyQuery';
import { InputListView } from 'src/Application/Input/View/InputListView';

@ApiBearerAuth()
@Controller('users/me/current-compagny')
@ApiUseTags('User')
@UseGuards(AuthGuard())
export class GetInputsByCompagnyController {
  constructor(
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter,
  ) {}

  @ApiOperation({
    title: 'Get compagny inputs by the logged user',
  })
  @Get('inputs')
  public async index(
    @Query() filters: InputFiltersDto,
    @LoggedUser() user: User,
  ): Promise<InputListView[]> {
    if (!user.currentCompagny) {
      throw new BadRequestException();
    }

    return await this.queryBus.execute(
      new GetInputsByCompagnyQuery(user.currentCompagny, filters),
    );
  }
}
