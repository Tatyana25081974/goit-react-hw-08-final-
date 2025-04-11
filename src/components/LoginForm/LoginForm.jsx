import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Додаємо useNavigate
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login } from '../../redux/auth/authOps';
import styles from './LoginForm.module.css';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Невірний email').required("Обов'язкове поле"),
  password: Yup.string().min(6, 'Мінімум 6 символів').required("Обов'язкове поле"),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Додаємо навігацію

  const handleSubmit = async (values, actions) => {
  try {
    await dispatch(login(values)).unwrap();
    actions.resetForm();
    navigate('/contacts');
  } catch (error) {
    let errorMessage = "Сталась помилка. Спробуйте ще раз.";

    if (error?.response?.status === 400) {
      errorMessage = "Невірний email або пароль.";
    } else if (error?.response?.status === 409) {
      errorMessage = "Користувач вже існує.";
    }

    actions.setStatus({ message: errorMessage });
  }
};


  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Вхід</h2>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ status }) => (
          <Form className={styles.form} autoComplete="off">
            <label className={styles.label}>
              Email
              <Field name="email" type="email" className={styles.input} />
              <ErrorMessage name="email" component="div" className={styles.error} />
            </label>

            <label className={styles.label}>
              Пароль
              <Field name="password" type="password" className={styles.input} />
              <ErrorMessage name="password" component="div" className={styles.error} />
            </label>

            {/* Виводимо помилку логіну з сервера */}
            {status && status.message && (
              <div className={styles.serverError}>
                {status.message}
              </div>
            )}

            <button type="submit" className={styles.button}>Увійти</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
