import { create } from 'zustand';
import {
  type LoginUser,
  loginRequest,
  registerRequest,
  type CreateUser,
  relavidateJWTRequest
} from '../api/auth';
import { updateImageRequest } from '../api/auth';
import { createLikeEventsRequest } from '../api/events';

interface ProfileProps {
  name: string;
  id: number;
  imageUrl: string | null;
  follows: number[] | null;
  liked_videos: number[] | null;
}

interface State {
  status: Status;
  errorMessage: undefined | Array<Record<string, string>>;
  profile: ProfileProps;
  checkingCredentials: boolean;
  messageEvent: undefined | any;
  messageLikeEvent: undefined | any;
  check: boolean;
}

interface Actions {
  loginUser: (user: LoginUser) => Promise<void>;
  registerUser: (user: CreateUser) => Promise<void>;
  checkAuthToken: () => Promise<void>;
  logOut: () => void;
  startSavingEvent: (url: string) => Promise<void>;
  startDeletingEvent: () => Promise<void>;
  clearMessageEvent: () => void;
  startLikeCreateEvents: (value: number) => Promise<void>;
  clearMessageLikeEvent: () => void;
  clearErrorMessage: () => void;
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
    messageLikeEvent: undefined,
    check: false,

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
    clearErrorMessage: () => {
      set({ errorMessage: undefined });
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

    logOut: () => {
      localStorage.clear();
      set({
        profile: undefined,
        status: Status.NotAuthenticated
      });
    },
    startSavingEvent: async (url) => {
      set({ check: true });
      try {
        const { profile } = get();
        const { data } = await updateImageRequest({
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
        set({ check: false });
      }
    },
    startDeletingEvent: async () => {
      set({ check: true });
      try {
        const { profile } = get();
        const { data } = await updateImageRequest({
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
        set({ check: false });
      }
    },
    clearMessageEvent: () => {
      set({ messageEvent: undefined });
    },
    startLikeCreateEvents: async (id: number) => {
      try {
        const { data } = await createLikeEventsRequest(id);
        set((state) => ({
          profile: {
            ...state.profile,
            liked_videos: data.likedVideos
          },
          messageLikeEvent: data.msg
        }));
      } catch (error) {
        console.log(error);
      }
    },
    clearMessageLikeEvent: () => {
      set({ messageLikeEvent: undefined });
    }
  };
});
