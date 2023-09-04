import { useEffect, useState } from 'react';
import type {
  FormValidation,
  FormValidations,
  FormValues
} from '../components/form';
import type { Name } from '../components/form/components';

export const useForm = (formValidations: FormValidations) => {
  const [formValues, setFormValues] = useState<FormValues>({});
  const [formValidation, setFormValidation] = useState<FormValidation>({});

  useEffect(() => {
    createValidators();
  }, [formValues]);

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const isFormValid = () => {
    for (const key in formValidation) {
      if (formValidation[key] !== null) return false;
    }
    return true;
  };

  const createValidators = () => {
    const formCheckValue: FormValidation = {};

    const keys = Object.keys(formValues);
    if (keys.length === 0) return;

    for (const formField in formValidations) {
      if (keys.includes(formField)) {
        const [fn, errorMessage] = formValidations[formField as Name];
        formCheckValue[`${formField}`] = fn(formValues[formField])
          ? null
          : errorMessage;
      }
    }
    setFormValidation(formCheckValue);
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
    isFormValid,
    resetForm
  };
};
