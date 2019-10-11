import { ApiBearerAuth, ApiUseTags, ApiOperation } from '@nestjs/swagger';
import {
  Controller,
  UseGuards,
  Inject,
  BadRequestException,
  Delete,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/Infrastructure/User/Decorator/LoggedUser';
import { User } from 'src/Domain/User/User.entity';
import { IQueryBusAdapter } from 'src/Application/Adapter/IQueryBusAdapter';
import { GetUserByIdQuery } from 'src/Application/User/Query/GetUserByIdQuery';
import { ICommandBusAdapter } from 'src/Application/Adapter/ICommandBusAdapter';
import { DeleteUserCompagnyCommand } from 'src/Application/User/Command/DeleteUserCompagnyCommand';

@ApiBearerAuth()
@Controller('users/me/current-compagny/users')
@ApiUseTags('User')
@UseGuards(AuthGuard())
export class DeleteUserCompagnyController {
  constructor(
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter,
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
  ) {}

  @ApiOperation({
    title: 'Remove user from a compagny by the logged user',
  })
  @Delete(':id')
  public async index(
    @Param() query: GetUserByIdQuery,
    @LoggedUser() loggedUser: User,
  ): Promise<void> {
    if (!loggedUser.currentCompagny) {
      throw new BadRequestException('user.errors.noCompagny');
    }

    const user = await this.queryBus.execute(query);
    if (!(user instanceof User)) {
      throw new BadRequestException('user.errors.notFound');
    }

    await this.commandBus.execute(
      new DeleteUserCompagnyCommand(loggedUser, user),
    );
  }
}
