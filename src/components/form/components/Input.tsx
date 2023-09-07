import { useContext } from 'react';
import { FormContext, type FormContextType } from '..';

import styles from './styles.module.scss';
import { useTheme } from '../../../context/ThemeContext';

interface InputProps {
  type?: 'text' | 'password';
  label: string;
  name: string;
  placeholder?: string;
}
export const Input = ({ type, label, name, placeholder }: InputProps) => {
  const { theme } = useTheme();
  const { formValues, handleChange } = useContext(
    FormContext
  ) as FormContextType;

  return (
    <div className={`${styles.inputContainer} ${styles[theme]}`}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={formValues[name] ?? ''}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
};
