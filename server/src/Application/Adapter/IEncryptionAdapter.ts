export interface IEncryptionAdapter {
  hash(payload: string): string;
  compare(payload: string, withPayload: string): boolean;
}
