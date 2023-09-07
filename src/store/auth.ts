import { create } from 'zustand';
import {
  type LoginUser,
  loginRequest,
  registerRequest,
  type CreateUser,
  relavidateJWTRequest
} from '../api/auth';

interface State {
  status: Status;
  errorMessage: undefined | Array<Record<string, string>>;
  profile: object;
  checkingCredentials: boolean;
  loginUser: (user: LoginUser) => Promise<void>;
  registerUser: (user: CreateUser) => Promise<void>;
  clearErrorMessage: () => void;
  checkAuthToken: () => Promise<void>;
}

export enum Status {
  NotAuthenticated = 'not-authenticated',
  Authenticated = 'authenticated',
  Checking = 'checking'
}

export const useAuthStore = create<State>((set) => {
  return {
    status: Status.Checking,
    profile: {},
    errorMessage: undefined,
    checkingCredentials: false,

    registerUser: async (user: CreateUser) => {
      set({ checkingCredentials: true });
      try {
        const { data } = await registerRequest(user);
        localStorage.setItem('token', data.token);
        set({ profile: data, status: Status.Authenticated });
      } catch (error: any) {
        set({
          errorMessage: error.response.data.msg,
          status: Status.NotAuthenticated
        });
      } finally {
        set({ checkingCredentials: false });
      }
    },
    loginUser: async (user: LoginUser) => {
      set({ checkingCredentials: true });
      try {
        const { data } = await loginRequest(user);
        localStorage.setItem('token', data.token);
        set({ profile: data, status: Status.Authenticated });
      } catch (error: any) {
        set({
          errorMessage: error.response.data.msg,
          status: Status.NotAuthenticated
        });
      } finally {
        set({ checkingCredentials: false });
      }
    },
    checkAuthToken: async () => {
      const token = localStorage.getItem('token');

      if (token === null) {
        set({ profile: {}, status: Status.NotAuthenticated });
        return;
      }
      try {
        const { data } = await relavidateJWTRequest();
        localStorage.setItem('token', data.token);
        set({ profile: data, status: Status.Authenticated });
      } catch (error) {
        localStorage.clear();
        set({ profile: {}, status: Status.NotAuthenticated });
      }
    },
    clearErrorMessage: () => {
      set({ errorMessage: undefined });
    }
  };
});
