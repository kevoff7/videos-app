import { create } from 'zustand';

interface UiStoreProps {
  isModalOpenLogout: boolean;
  isModalOpenImageProfile: boolean;
  isModalOpenVideoDetails: boolean;
  onModalOpenLogOut: () => void;
  onModalCloseLogOut: () => void;
  onModalOpenImageProfile: () => void;
  onModalCloseImageProfile: () => void;
  onModalOpenVideoDetails: () => void;
  onModalCloseVideoDetails: () => void;
}

export const useUiStore = create<UiStoreProps>((set) => {
  return {
    isModalOpenLogout: false,
    isModalOpenImageProfile: false,
    isModalOpenVideoDetails: false,
    onModalOpenLogOut: () => {
      set({ isModalOpenLogout: true });
    },
    onModalCloseLogOut: () => {
      set({ isModalOpenLogout: false });
    },
    onModalOpenImageProfile: () => {
      set({ isModalOpenImageProfile: true });
    },
    onModalCloseImageProfile: () => {
      set({ isModalOpenImageProfile: false });
    },
    onModalOpenVideoDetails: () => {
      set({ isModalOpenVideoDetails: true });
    },
    onModalCloseVideoDetails: () => {
      set({ isModalOpenVideoDetails: false });
    }
  };
});
