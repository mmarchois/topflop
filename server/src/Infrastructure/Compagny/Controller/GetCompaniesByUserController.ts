import { ApiBearerAuth, ApiUseTags, ApiOperation } from '@nestjs/swagger';
import {
  Controller,
  UseGuards,
  Inject,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/Infrastructure/User/Decorator/LoggedUser';
import { User } from 'src/Domain/User/User.entity';
import { IQueryBusAdapter } from 'src/Application/Adapter/IQueryBusAdapter';
import { GetCompaniesByUserQuery } from 'src/Application/Compagny/Query/GetCompaniesByUserQuery';
import { CompagnyView } from 'src/Application/Compagny/View/CompagnyView';

@ApiBearerAuth()
@Controller('users')
@ApiUseTags('User')
@UseGuards(AuthGuard())
export class GetCompaniesByUserController {
  constructor(
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter,
  ) {}

  @ApiOperation({
    title: 'Get companies from the logged user',
  })
  @Get('me/companies')
  public async index(@LoggedUser() user: User): Promise<CompagnyView[]> {
    if (!user.currentCompagny) {
      throw new BadRequestException('user.errors.noCompagny');
    }

    return await this.queryBus.execute(new GetCompaniesByUserQuery(user));
  }
}
