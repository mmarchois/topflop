import Error from '../models/Error';

export interface ILoadingAction {
  loading: boolean;
}

export interface IErrorAction {
  errors: Error[];
}
