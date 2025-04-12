import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { register } from '../../redux/auth/operations';
import styles from './RegistrationForm.module.css';
import { toast } from 'react-hot-toast'; 

const RegistrationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Імʼя має містити мінімум 2 символи')
    .required('Обовʼязково'),
  email: Yup.string()
    .email('Некоректний email')
    .required('Обовʼязково'),
  password: Yup.string()
    .min(6, 'Пароль має містити мінімум 6 символів')
    .required('Обовʼязково'),
});

export default function RegistrationForm() {
  const dispatch = useDispatch();

  const handleSubmit = async (values, actions) => {
  try {
    await dispatch(register(values)).unwrap(); 
    actions.resetForm();
    toast.success('Реєстрація успішна! 🎉');
      
  } catch (error) {
    let errorMessage = "Сталася помилка. Спробуйте ще раз.";

    if (error?.response?.status === 400) {
      errorMessage = "Невірні дані для реєстрації.";
    } else if (error?.response?.status === 409) {
      errorMessage = "Користувач з таким email вже існує.";
    }

    actions.setStatus({ message: errorMessage });
  }
};


  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Реєстрація</h2>

      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={RegistrationSchema}
        onSubmit={handleSubmit}
      >
        {({ status }) => ( // Додаємо status тут!
          <Form className={styles.form} autoComplete="off">
            <label className={styles.label}>
              Ім'я
              <Field name="name" type="text" className={styles.input} autoComplete="new-name"/>
              <ErrorMessage name="name" component="div" className={styles.error} />
            </label>

            <label className={styles.label}>
              Email
              <Field name="email" type="email" className={styles.input} autoComplete="new-email"/>
              <ErrorMessage name="email" component="div" className={styles.error} />
            </label>

            <label className={styles.label}>
              Пароль
              <Field name="password" type="password" className={styles.input} autoComplete="new-password"/>
              <ErrorMessage name="password" component="div" className={styles.error} />
            </label>

            {/* Виводимо помилку реєстрації з сервера */}
            {status && status.message && (
              <div className={styles.serverError}>{status.message}</div>
            )}

            <button type="submit" className={styles.button}>
              Зареєструватися
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
