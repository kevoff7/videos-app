import { useTheme } from '../../../context/ThemeContext';
import styles from './styles.module.scss';

interface SubmitButtonProps {
  buttonText: string;
}

export const SubmitButton = ({ buttonText }: SubmitButtonProps) => {
  const { theme } = useTheme();
  return (
    <button className={`${styles.submitButton} ${styles[theme]}`} type="submit">
      {buttonText}
    </button>
  );
};
