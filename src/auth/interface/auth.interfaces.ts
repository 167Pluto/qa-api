import { User } from '../../users/entities';

export interface LoginResponseData {
  token: string;
  tokenExpirationTime: number;
}

export interface RegisterResponseData {
  user: User;
  authData: LoginResponseData;
}
