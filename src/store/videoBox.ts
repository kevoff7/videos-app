import { create } from 'zustand';

interface UseVideoBoxStoreProps {
  onChangePhoto: () => void;
  onRemovePhoto: () => void;
}

export const useVideoBoxStore = create<UseVideoBoxStoreProps>((set) => {
  return {
    onChangePhoto: () => {},
    onRemovePhoto: () => {}
  };
});
