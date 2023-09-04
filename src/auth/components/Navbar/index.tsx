import { useTheme } from '../../../context/ThemeContext';
import styles from './styles.module.scss';
export const Navbar = () => {
  const { toggleTheme } = useTheme();
  return (
    <nav className={styles.nav}>
      <label>
        <div className={styles.toggle}>
          <input
            className={styles['toggle-state']}
            type="checkbox"
            name="check"
            value="check"
            onClick={toggleTheme}
          />
          <div className={styles.indicator}></div>
        </div>
      </label>
    </nav>
  );
};
