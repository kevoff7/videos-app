import { useTheme } from '../../../context/ThemeContext';
import styles from './styles.module.scss';
export const Navbar = () => {
  const { toggleTheme, themeLight } = useTheme();
  return (
    <nav className={styles.nav}>
      <label>
        <div className={styles.toggle}>
          <input
            className={styles['toggle-state']}
            type="checkbox"
            onClick={toggleTheme}
            defaultChecked={themeLight}
          />
          <div className={styles.indicator}></div>
        </div>
      </label>
    </nav>
  );
};
