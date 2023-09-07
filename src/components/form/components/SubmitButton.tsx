import { useTheme } from '../../../context/ThemeContext';
import { Loader } from '../../Loader/Loader';
import styles from './styles.module.scss';

interface SubmitButtonProps {
  buttonText: string;
  check: boolean;
}

export const SubmitButton = ({ buttonText, check }: SubmitButtonProps) => {
  const { theme } = useTheme();
  return (
    <button
      disabled={check}
      className={`${styles.submitButton} ${styles[theme]} ${
        check && styles.check
      }`}
      type="submit"
    >
      {check ? <Loader /> : buttonText}
    </button>
  );
};
