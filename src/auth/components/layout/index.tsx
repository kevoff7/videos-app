import { Navbar } from '..';
import { useTheme } from '../../../context/ThemeContext';
import styles from './styles.module.scss';

interface LayoutProps {
  children: JSX.Element[] | JSX.Element;
}

export const Layout = ({ children }: LayoutProps) => {
  const { theme } = useTheme();
  return (
    <main className={`${styles.container} ${styles[theme]}`}>
      <Navbar />
      {children}
    </main>
  );
};
