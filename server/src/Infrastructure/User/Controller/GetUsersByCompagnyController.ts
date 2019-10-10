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
import { UserFiltersDto } from './Dto/UserFiltersDto';
import { GetUsersByCompagnyQuery } from 'src/Application/User/Query/GetUsersByCompagnyQuery';
import { Pagination } from 'src/Application/Common/Pagination';
import { UserView } from 'src/Application/User/View/UserView';

@ApiBearerAuth()
@Controller('users/me/current-compagny')
@ApiUseTags('User')
@UseGuards(AuthGuard())
export class GetUsersByCompagnyController {
  constructor(
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter,
  ) {}

  @ApiOperation({
    title: 'Get users from the logged user compagny',
  })
  @Get('users')
  public async index(
    @Query() filters: UserFiltersDto,
    @LoggedUser() user: User,
  ): Promise<Pagination<UserView>> {
    if (!user.currentCompagny) {
      throw new BadRequestException('user.errors.noCompagny');
    }

    return await this.queryBus.execute(
      new GetUsersByCompagnyQuery(user, filters),
    );
  }
}
