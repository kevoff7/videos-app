import { Form } from '../../components/form';
import { Name } from '../../components/form/components';
import { Layout } from '../components';
import styles from './styles.module.scss';
import Swal from 'sweetalert2';

export const Login = () => {
  const login = (formData: Record<string, string>) => {
    console.log(formData);
  };
  return (
    <Layout>
      <div className={styles.form}>
        <Form
          title="Inicia Sesión"
          description="Formulario para iniciar sesíon"
          onSubmit={login}
        >
          <div>
            <Form.Input
              label="Correo"
              name={Name.Email}
              placeholder="Ingresa tu correo..."
            />
            <Form.Input
              label="Contraseña"
              name={Name.Password}
              placeholder="Ingresa tu contraseña..."
              type="password"
            />
          </div>
          <Form.SubmitButton buttonText="Iniciar Sesión" />
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
