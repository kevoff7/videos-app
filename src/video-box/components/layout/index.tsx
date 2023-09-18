import { LogOutModal, ImageProfileModal, Navbar } from '..';
import { useTheme } from '../../../context/ThemeContext';
import { useAuthStore, useUiStore } from '../../../store';
import styles from './styles.module.scss';

interface LayoutVideoNubeProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutVideoNubeProps) => {
  const { theme } = useTheme();
  const profile = useAuthStore((state) => state.profile);

  const isModalOpenLogout = useUiStore((state) => state.isModalOpenLogout);
  const isModalOpenImageProfile = useUiStore(
    (state) => state.isModalOpenImageProfile
  );

  return (
    <main className={`${styles.container} ${styles[theme]}`}>
      {isModalOpenLogout && <LogOutModal />}
      {isModalOpenImageProfile && (
        <ImageProfileModal content={profile.imageUrl ?? profile.name[0]} />
      )}

      <Navbar />
      <section className={`${styles.content} ${styles[theme]}`}>
        {children}
      </section>
    </main>
  );
};
