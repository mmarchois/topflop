import * as bcrypt from 'bcrypt';
import { IEncryptionAdapter } from 'src/Application/Adapter/IEncryptionAdapter';

export class EncryptionAdapter implements IEncryptionAdapter {
  public hash = (payload: string): string => {
    return bcrypt.hashSync(payload, 10);
  };

  public compare = (payload: string, withPayload: string): boolean => {
    return bcrypt.compareSync(payload, withPayload);
  };
}
