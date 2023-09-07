import authApi from '../libs/axios';

export interface CreateUser {
  email: string;
  password: string;
  name: string;
  confirmedPassword: string;
}

export type LoginUser = Omit<CreateUser, 'name' | 'confirmedPassword'>;

export const registerRequest = async (data: CreateUser) => {
  return await authApi.post('/auth/new', data);
};

export const loginRequest = async (data: LoginUser) => {
  return await authApi.post('/auth/', data);
};

export const relavidateJWTRequest = async () => {
  return await authApi.get('/auth/renew');
};
