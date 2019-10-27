export interface INotifierAdapter {
  notify(topic: string, payload: any): void;
}
