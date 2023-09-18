import { Form } from '../../components/form';
import { useAuthStore } from '../../store/auth';
import { Layout } from '../components';
import { Toaster, toast } from 'sonner';
import styles from './styles.module.scss';
import { useEffect } from 'react';

export const Login = () => {
  const checkingCredentials = useAuthStore(
    (state) => state.checkingCredentials
  );
  const errorMessage = useAuthStore((state) => state.errorMessage);
  const loginUser = useAuthStore((state) => state.loginUser);
  const login = (formData: any) => {
    void loginUser(formData);
  };
  useEffect(() => {
    if (errorMessage === undefined) return;
    errorMessage.map((error) => toast.error(error.message));
  }, [errorMessage]);
  return (
    <Layout>
      <div className={styles.form}>
        <Toaster richColors expand={true} />
        <Form title="Login" description="Login form" onSubmit={login}>
          <div>
            <Form.Input
              label="Email"
              name={'email'}
              placeholder="test@gmail.com"
            />
            <Form.Input
              label="Password"
              name={'password'}
              placeholder="123456"
              type="password"
            />
          </div>
          <Form.SubmitButton buttonText="Login" check={checkingCredentials} />
          <Form.Footer
            description="Don't have an account?"
            textLink="Register"
            link="/auth/register"
          />
        </Form>
      </div>
    </Layout>
  );
};
