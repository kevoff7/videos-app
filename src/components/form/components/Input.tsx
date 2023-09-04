import { useContext, useEffect } from 'react';
import { FormContext, type FormContextType } from '..';

import styles from './styles.module.scss';
import { useTheme } from '../../../context/ThemeContext';

export enum Name {
  Email = 'email',
  Password = 'password',
  Passwordconfirmed = 'passwordconfirmed'
}

interface InputProps {
  type?: 'text' | 'password';
  label: string;
  name: Name;
  placeholder?: string;
}
export const Input = ({ type, label, name, placeholder }: InputProps) => {
  const { theme } = useTheme();
  const {
    formValues,
    formValidation,
    handleChange,
    isFirstClick,
    setFormValues
  } = useContext(FormContext) as FormContextType;
  const data = isFirstClick ? formValidation : null;
  useEffect(() => {
    setFormValues((prevState) => {
      return { ...prevState, [name]: '' };
    });
  }, []);

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
      {data !== null && <span className={styles.textError}>{data[name]}</span>}
    </div>
  );
};
