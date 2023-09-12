import { create } from 'zustand';
import {
  type LoginUser,
  loginRequest,
  registerRequest,
  type CreateUser,
  relavidateJWTRequest
} from '../api/auth';
import { addImageRequest } from '../api/auth';

interface ProfileProps {
  name: string;
  id: number;
  imageUrl: string | null;
  follows: number[];
  liked_videos: number[];
}

interface State {
  status: Status;
  errorMessage: undefined | Array<Record<string, string>>;
  profile: ProfileProps;
  checkingCredentials: boolean;
  messageEvent: undefined | any;
}

interface Actions {
  loginUser: (user: LoginUser) => Promise<void>;
  registerUser: (user: CreateUser) => Promise<void>;
  clearErrorMessage: () => void;
  checkAuthToken: () => Promise<void>;
  logOut: () => void;
  startSavingEvent: (url: string) => Promise<void>;
  startDeletingEvent: () => Promise<void>;
  clearMessageEvent: () => void;
}

export enum Status {
  NotAuthenticated = 'not-authenticated',
  Authenticated = 'authenticated',
  Checking = 'checking'
}

export const useAuthStore = create<State & Actions>((set, get) => {
  return {
    status: Status.Checking,
    profile: {
      name: '',
      id: NaN,
      imageUrl: null,
      follows: [],
      liked_videos: []
    },
    errorMessage: undefined,
    checkingCredentials: false,
    messageEvent: undefined,

    registerUser: async (user: CreateUser) => {
      set({ checkingCredentials: true });
      try {
        const { data } = await registerRequest(user);
        localStorage.setItem('token', data.token);
        set({
          profile: {
            name: data.name,
            id: data.id,
            imageUrl: data.urlimage,
            liked_videos: data.liked_videos,
            follows: data.follows
          },
          status: Status.Authenticated,
          errorMessage: undefined
        });
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
        set({
          profile: {
            name: data.name,
            id: data.id,
            imageUrl: data.urlimage,
            liked_videos: data.liked_videos,
            follows: data.follows
          },
          status: Status.Authenticated,
          errorMessage: undefined
        });
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

      if (token == null) {
        set({ profile: undefined, status: Status.NotAuthenticated });
        return;
      }
      try {
        const { data } = await relavidateJWTRequest();

        localStorage.setItem('token', data.token);

        set({
          profile: {
            name: data.name,
            id: data.id,
            imageUrl: data.urlimage,
            liked_videos: data.liked_videos,
            follows: data.follows
          },
          status: Status.Authenticated
        });
      } catch (error: any) {
        localStorage.clear();
        set({ profile: undefined, status: Status.NotAuthenticated });
      }
    },
    clearErrorMessage: () => {
      set({ errorMessage: undefined });
    },
    logOut: () => {
      localStorage.clear();
      set({
        profile: undefined,
        status: Status.NotAuthenticated
      });
    },
    startSavingEvent: async (url) => {
      try {
        const { profile } = get();
        const { data } = await addImageRequest({
          uid: profile.id,
          data: {
            url
          }
        });
        const { img, ...props } = data;
        set((state) => ({
          profile: {
            ...state.profile,
            imageUrl: img
          },
          messageEvent: props
        }));
      } catch (error: any) {
        console.log(error);
        set({ messageEvent: error.response.data });
      } finally {
        setTimeout(() => {
          set({ messageEvent: undefined });
        }, 5000);
      }
    },
    startDeletingEvent: async () => {
      try {
        const { profile } = get();
        const { data } = await addImageRequest({
          uid: profile.id,
          data: {
            url: null
          }
        });
        const { img, ...props } = data;
        set((state) => ({
          profile: {
            ...state.profile,
            imageUrl: img
          },
          messageEvent: props
        }));
      } catch (error: any) {
        console.log(error);
        set({ messageEvent: error.response.data });
      } finally {
        setTimeout(() => {
          set({ messageEvent: undefined });
        }, 5000);
      }
    },
    clearMessageEvent: () => {
      set({ messageEvent: undefined });
    }
  };
});
