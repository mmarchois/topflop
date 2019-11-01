import 'dotenv/config';
import axios from 'axios';
import * as querystring from 'querystring';
import { INotifierAdapter } from 'src/Application/Adapter/INotifierAdapter';

export class NotifierAdapter implements INotifierAdapter {
  public notify = (topic: string, payload: any): void => {
    const data = querystring.stringify({
      topic,
      data: JSON.stringify({ payload }),
    });

    axios.post(process.env.MERCURE_PUBLISH_URL, data, {
      headers: {
        Authorization: `Bearer ${process.env.MERCURE_JWT_TOKEN}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(data),
      },
    });
  };
}
