import { useTheme } from '../../../context/ThemeContext';
import styles from './styes.module.scss';

interface ButtonProps {
  text: string;
  onClick: () => void;
  type?: 'primary' | 'secondary';
}

interface ButtonModalProps {
  text: string;
  onClick?: () => void;
  type?: 'button1' | 'button2' | 'button3';
  typeButton?: 'submit';
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

export const ButtonModal = ({
  text,
  onClick,
  type = 'button1',
  typeButton
}: ButtonModalProps) => {
  const { theme } = useTheme();
  return (
    <button
      className={`${styles.buttonModal} ${styles[type]} ${styles[theme]}`}
      onClick={onClick}
      type={typeButton}
    >
      {text}
    </button>
  );
};
