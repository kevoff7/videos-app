import { useState } from 'react';
import type { FormValidation, FormValues } from '../components/form';

export const useForm = () => {
  const [formValues, setFormValues] = useState<FormValues>({});
  const [formValidation, setFormValidation] = useState<FormValidation>({});

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const resetForm = () => {
    setFormValues({});
    setFormValidation({});
  };

  return {
    formValues,
    formValidation,
    setFormValidation,
    handleChange,
    setFormValues,
    resetForm
  };
};
