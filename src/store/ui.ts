import { create } from 'zustand';

interface UiStoreProps {
  isModalOpenLogout: boolean;
  isModalOpenImageProfile: boolean;
  onModalOpenLogOut: () => void;
  onModalCloseLogOut: () => void;
  onModalOpenImageProfile: () => void;
  onModalCloseImageProfile: () => void;
}

export const useUiStore = create<UiStoreProps>((set) => {
  return {
    isModalOpenLogout: false,
    isModalOpenImageProfile: false,
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
    }
  };
});
