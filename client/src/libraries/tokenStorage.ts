import * as Cookies from 'js-cookie';

export const TOKEN_KEY = 'topflop_token';

export class TokenStorage {
  public static save = (token: string): void => {
    Cookies.set(TOKEN_KEY, token, {
      secure: true,
    });
  };

  public static get = () => {
    return Cookies.get(TOKEN_KEY);
  };

  public static remove = (): void => {
    Cookies.remove(TOKEN_KEY);
  };
}
