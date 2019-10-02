import { Post, Controller, Body, Inject } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { ICommandBusAdapter } from 'src/Application/Adapter/ICommandBusAdapter';
import { LoginCommand } from 'src/Application/Auth/Command/LoginCommand';
import { AuthenticatedView } from 'src/Application/Auth/View/AuthenticatedView';

@Controller('login')
@ApiUseTags('Auth')
export class LoginController {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
  ) {}

  @Post()
  public async index(
    @Body() command: LoginCommand,
  ): Promise<AuthenticatedView> {
    return await this.commandBus.execute(command);
  }
}
