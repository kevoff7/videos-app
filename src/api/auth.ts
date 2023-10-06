import authApi from '../libs/axios';

export interface CreateUser {
  email: string;
  password: string;
  name: string;
  confirmedPassword: string;
}

interface AddImageRequest {
  uid: number;
  data: {
    url: string | null;
  };
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

export const updateImageRequest = async ({ uid, data }: AddImageRequest) => {
  return await authApi.put(`/auth/${uid}`, data);
};
