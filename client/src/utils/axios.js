import axios from 'axios';
import { TokenStorage } from './tokenStorage';
import { logout } from '../modules/auth/actions/authentication';

const API_URL = process.env.REACT_APP_API_URL;

export const client = axios.create({
  baseURL: API_URL,
});

export const axiosMiddleware = axios => ({ dispatch }) => {
  axios.interceptors.request.use(config => {
    if ('login' !== config.url && 'register' !== config.url) {
      config.headers.Authorization = `Bearer ${TokenStorage.get()}`;
    }

    return config;
  });

  axios.interceptors.response.use(
    response => response,
    error => {
      const { responseURL } = error.request;
      const authURL = `${API_URL}/register`;

      if (401 === error.response.status && responseURL !== authURL) {
        return dispatch(logout());
      }

      return Promise.reject(error.response.data);
    },
  );

  return next => action => next(action);
};
