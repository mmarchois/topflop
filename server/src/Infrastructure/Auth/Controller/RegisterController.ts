import { Post, Controller, Body, Inject } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { RegisterCommand } from 'src/Application/Auth/Command/RegisterCommand';
import { ICommandBusAdapter } from 'src/Application/Adapter/ICommandBusAdapter';
import { AuthenticatedView } from 'src/Application/Auth/View/AuthenticatedView';

@Controller('register')
@ApiUseTags('Auth')
export class RegisterController {
  constructor(
    @Inject('ICommandBusAdapter')
    private readonly commandBus: ICommandBusAdapter,
  ) {}

  @Post()
  public async index(
    @Body() command: RegisterCommand,
  ): Promise<AuthenticatedView> {
    return await this.commandBus.execute(command);
  }
}
