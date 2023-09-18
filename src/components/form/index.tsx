import { createContext } from 'react';

import { Input, SubmitButton, Footer } from './components';

import styles from './styles.module.scss';
import { useTheme } from '../../context/ThemeContext';
import { useForm } from '../../hooks/useForm';

export type FormValues = Record<string, string>;
export type FormValidation = Record<string, string | null>;

export interface FormContextType {
  formValues: FormValues;
  formValidation: FormValidation;
  handleChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
}

interface FormProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  onSubmit: (values: FormValues) => void;
}

export const FormContext = createContext<FormContextType | undefined>(
  undefined
);

export const Form = ({ title, description, children, onSubmit }: FormProps) => {
  const { theme } = useTheme();
  const { formValues, formValidation, handleChange, setFormValues } = useForm();
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    onSubmit(formValues);
  };

  return (
    <FormContext.Provider
      value={{
        formValues,
        formValidation,
        handleChange,
        setFormValues
      }}
    >
      <form
        onSubmit={handleSubmit}
        className={`${styles.form} ${styles[theme]}`}
      >
        <div className={styles.titleAndDesc}>
          <h2>{title}</h2>
          {description ?? <p>{description}</p>}
        </div>
        {children}
      </form>
    </FormContext.Provider>
  );
};

Form.Input = Input;
Form.SubmitButton = SubmitButton;
Form.Footer = Footer;
