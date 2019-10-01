import 'dotenv/config';
import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { User } from 'src/Domain/User/User.entity';
import { IQueryBusAdapter } from 'src/Application/Adapter/IQueryBusAdapter';
import { GetUserByApiToken } from 'src/Application/User/Query/GetUserByApiTokenQuery';

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy, 'bearer') {
  constructor(
    @Inject('IQueryBusAdapter')
    private readonly queryBus: IQueryBusAdapter,
  ) {
    super();
  }

  public validate = async (token: string): Promise<User> => {
    const user = await this.queryBus.execute(new GetUserByApiToken(token));

    if (!(user instanceof User)) {
      throw new UnauthorizedException();
    }

    return user;
  };
}
