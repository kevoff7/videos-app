import { useTheme } from '../../../context/ThemeContext';
import styles from './styes.module.scss';

interface ButtonProps {
  text: string;
  onClick: () => void;
  type?: 'primary' | 'secondary';
}

export const Button = ({ text, onClick, type = 'secondary' }: ButtonProps) => {
  const { theme } = useTheme();
  return (
    <button
      className={`${styles.button} ${styles[type]} ${styles[theme]}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
