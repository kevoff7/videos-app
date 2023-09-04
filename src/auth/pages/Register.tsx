import { Form } from '../../components/form';
import { Name } from '../../components/form/components';
import { Layout } from '../components';
import styles from './styles.module.scss';

export const Register = () => {
  const register = (formData: Record<string, string>) => {
    console.log(formData);
  };
  return (
    <Layout>
      <div className={styles.form}>
        <Form
          onSubmit={register}
          title="Registrate"
          description="Formulario para crear una cuenta"
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
            <Form.Input
              label="Confirmar contraseña"
              name={Name.Passwordconfirmed}
              placeholder="Repita su contraseña..."
              type="password"
            />
          </div>
          <Form.SubmitButton buttonText="Crear cuenta" />

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
