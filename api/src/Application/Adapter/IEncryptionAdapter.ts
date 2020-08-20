export interface IEncryptionAdapter {
  hash(payload: string): Promise<string>;
  compare(payload: string, hash: string): Promise<boolean>;
}
