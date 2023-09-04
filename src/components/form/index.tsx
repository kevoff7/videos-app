import { createContext, useState } from 'react';

import { Input, SubmitButton, Footer, Name } from './components';

import styles from './styles.module.scss';
import { useTheme } from '../../context/ThemeContext';
import { useForm } from '../../hooks/useForm';

export type FormValues = Record<string, string>;
export type FormValidation = Record<string, string | null>;

export type FormValidations = Record<
  Name,
  [(value: string) => boolean, string]
>;

export interface FormContextType {
  formValues: FormValues;
  formValidation: FormValidation;
  handleChange: ({ target }: React.ChangeEvent<HTMLInputElement>) => void;
  isFirstClick: boolean;
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

const formValidations: FormValidations = {
  [Name.Email]: [
    (value) => value.includes('@'),
    'El correo debe de tener un @'
  ],
  [Name.Password]: [
    (value) => value.length >= 6,
    'El password debe de tener mas de 6 caracteres'
  ],
  [Name.Passwordconfirmed]: [
    (value) => value.length >= 6,
    'El password debe de tener mas de 6 caracteres'
  ]
};

export const Form = ({ title, description, children, onSubmit }: FormProps) => {
  const { theme } = useTheme();
  const {
    formValues,
    formValidation,
    handleChange,
    setFormValues,
    isFormValid,
    resetForm
  } = useForm(formValidations);
  const [isFirstClick, setFirstClick] = useState<boolean>(false);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!isFirstClick) {
      setFirstClick(true);
    }
    if (!isFormValid()) return;
    onSubmit(formValues);
    resetForm();
  };

  return (
    <FormContext.Provider
      value={{
        formValues,
        formValidation,
        handleChange,
        isFirstClick,
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
