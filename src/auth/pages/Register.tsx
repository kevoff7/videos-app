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
          description="Formulario para crear una cuenta"
        >
          <div>
            <Form.Input
              label="Nombre"
              name={'name'}
              placeholder="Ingresa tu nombre..."
            />
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
            <Form.Input
              label="Confirmar contraseña"
              name={'confirmedPassword'}
              placeholder="Repita su contraseña..."
              type="password"
            />
          </div>
          <Form.SubmitButton
            buttonText="Crear cuenta"
            check={checkingCredentials}
          />

          <Form.Footer
            description="Ya tienes cuenta?"
            textLink="Inicia sesión"
            link="/auth/login"
          />
        </Form>
      </div>
    </Layout>
  );
};
