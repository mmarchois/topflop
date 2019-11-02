import 'dotenv/config';
import axios from 'axios';
import * as jwt from 'jsonwebtoken';
import * as querystring from 'querystring';
import { INotifierAdapter } from 'src/Application/Adapter/INotifierAdapter';
import { Compagny } from 'src/Domain/Compagny/Compagny.entity';

export class NotifierAdapter implements INotifierAdapter {
  public notify = (compagny: Compagny, topic: string, payload: any): void => {
    const token = jwt.sign(
      {
        mercure: {
          subscribe: [`topflop/${compagny.id}`],
          publish: [`topflop/${compagny.id}`],
        },
      },
      process.env.JWT_KEY,
    );

    const data = querystring.stringify({
      topic,
      data: JSON.stringify({ ...payload }),
    });

    axios.post(process.env.MERCURE_PUBLISH_URL, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(data),
      },
    });
  };
}
