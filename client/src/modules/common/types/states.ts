import Error from '../models/Error';

export interface IState {
  loading: boolean;
  errors: Error[];
}
