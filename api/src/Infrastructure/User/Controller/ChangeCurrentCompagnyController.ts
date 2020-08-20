import {
  Controller,
  UseGuards,
  Put,
  Inject,
  Body,
  NotFoundException
} from '@nestjs/common';
import {ApiTags, ApiBearerAuth, ApiOperation} from '@nestjs/swagger';
import {AuthGuard} from '@nestjs/passport';
import {User} from 'src/Domain/User/User.entity';
import {ICommandBusAdapter} from 'src/Application/Adapter/ICommandBusAdapter';
import {IQueryBusAdapter} from 'src/Application/Adapter/IQueryBusAdapter';
import {LoggedUser} from '../Decorator/LoggedUser';
import {GetCompagnyByIdQuery} from 'src/Application/Compagny/Query/GetCompagnyByIdQuery';
import {ChangeCurrentCompagnyCommand} from 'src/Application/User/Command/ChangeCurrentCompagnyCommand';
import {Compagny} from 'src/Domain/Compagny/Compagny.entity';
import {CurrentCompagnyDto} from './Dto/CurrentCompagnyDto';
import {UserView} from 'src/Application/User/View/UserView';

@ApiBearerAuth()
@Controller('users')
@ApiTags('User')
@UseGuards(AuthGuard('bearer'))
export class ChangeCurrentCompagnyController {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter
  ) {}

  @ApiOperation({summary: 'Change the logged user current compagny'})
  @Put('me/current-compagny')
  public async index(
    @Body() dto: CurrentCompagnyDto,
    @LoggedUser() user: User
  ): Promise<UserView> {
    const query = new GetCompagnyByIdQuery();
    query.id = dto.compagny;

    const compagny = await this.queryBus.execute(query);
    if (!(compagny instanceof Compagny)) {
      throw new NotFoundException('compagny.errors.notFound');
    }

    return await this.commandBus.execute(
      new ChangeCurrentCompagnyCommand(user, compagny)
    );
  }
}
