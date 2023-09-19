import { Loader } from '../../../components/Loader/Loader';
import { useTheme } from '../../../context/ThemeContext';
import styles from './styes.module.scss';

interface ButtonProps {
  text: string;
  onClick: () => void;
  type?: 'primary' | 'secondary';
  check?: boolean;
}

interface ButtonModalProps {
  text: string;
  onClick?: () => void;
  type?: 'button1' | 'button2' | 'button3';
  typeButton?: 'submit';
  check?: boolean;
}

export const Button = ({
  text,
  onClick,
  check = false,
  type = 'secondary'
}: ButtonProps) => {
  const { theme } = useTheme();
  return (
    <button
      className={`${styles.button} ${styles[type]} ${styles[theme]}`}
      onClick={onClick}
    >
      {check ? <Loader /> : text}
    </button>
  );
};

export const ButtonModal = ({
  text,
  onClick,
  type = 'button1',
  typeButton,
  check = false
}: ButtonModalProps) => {
  const { theme } = useTheme();
  return (
    <button
      className={`${styles.buttonModal} ${styles[type]} ${styles[theme]}`}
      onClick={onClick}
      type={typeButton}
    >
      {check ? <Loader /> : text}
    </button>
  );
};
