import { useEffect } from 'react';
import { Form } from '../../components/form';
import { useAuthStore } from '../../store/auth';
import { Layout } from '../components';
import styles from './styles.module.scss';
import { Toaster, toast } from 'sonner';

export const Register = () => {
  const checkingCredentials = useAuthStore(
    (state) => state.checkingCredentials
  );
  const errorMessage = useAuthStore((state) => state.errorMessage);
  const registerUser = useAuthStore((state) => state.registerUser);
  const register = (formData: any) => {
    void registerUser(formData);
  };
  useEffect(() => {
    if (errorMessage === undefined) return;
    if (errorMessage.length > 3) {
      toast.error('Credenciales incorrectas');
      return;
    }
    errorMessage.map((error) => toast.error(error.message));
  }, [errorMessage]);
  return (
    <Layout>
      <div className={styles.form}>
        <Toaster richColors expand={true} />
        <Form
          onSubmit={register}
          title="Registrate"
          description="Form to create an account"
        >
          <div>
            <Form.Input
              label="Name"
              name={'name'}
              placeholder="Enter your name..."
            />
            <Form.Input
              label="Email"
              name={'email'}
              placeholder="Enter your email..."
            />
            <Form.Input
              label="Password"
              name={'password'}
              placeholder="Enter your password..."
              type="password"
            />
            <Form.Input
              label="Confirmed password"
              name={'confirmedPassword'}
              placeholder="Repeat your password..."
              type="password"
            />
          </div>
          <Form.SubmitButton
            buttonText="Create account"
            check={checkingCredentials}
          />

          <Form.Footer
            description="Already have an account?"
            textLink="Login"
            link="/auth/login"
          />
        </Form>
      </div>
    </Layout>
  );
};
