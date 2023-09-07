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
        <Form
          title="Inicia Sesión"
          description="Formulario para iniciar sesíon"
          onSubmit={login}
        >
          <div>
            <Form.Input
              label="Correo"
              name={'email'}
              placeholder="Ingresa tu correo..."
            />
            <Form.Input
              label="Contraseña"
              name={'password'}
              placeholder="Ingresa tu contraseña..."
              type="password"
            />
          </div>
          <Form.SubmitButton
            buttonText="Iniciar Sesión"
            check={checkingCredentials}
          />
          <Form.Footer
            description="Te olvidaste tu contraseña?"
            textLink="Recuperar contraseña"
            link="#"
          />
          <Form.Footer
            description="Aun no tienes cuenta?"
            textLink="Registrate"
            link="/auth/register"
          />
        </Form>
      </div>
    </Layout>
  );
};
