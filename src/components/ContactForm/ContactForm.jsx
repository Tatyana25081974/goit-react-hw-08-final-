import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contacts/contactsOps';
import { selectContacts } from '../../redux/contacts/contactsSelectors';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = (values, { resetForm }) => {
    const { name, number } = values;

    // Перевірка чи існує такий контакт
    const isExist = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isExist) {
      alert(`${name} вже є у вашій телефонній книзі.`);
      return;
    }

    dispatch(addContact({ name, number }));
    resetForm();
  };

  const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Ім'я повинно містити мінімум 2 символи")
    .max(30, "Ім'я повинно містити максимум 30 символів")
    .required("Введіть ім'я"),

  number: Yup.string()
    .matches(
      /^\+\(\d{3}\)\d{3}-\d{2}-\d{2}$/,
      "Формат має бути +(XXX)XXX-XX-XX"
    )
    .required('Введіть номер телефону у форматі +(XXX)XXX-XX-XX'),
});

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Додати контакт</h2>
      <Formik
        initialValues={{ name: '', number: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={styles.form}>
          <label className={styles.label}>
            Ім'я
            <Field name="name" type="text" className={styles.input} />
            <ErrorMessage name="name" component="div" className={styles.error} />
          </label>

          <label className={styles.label}>
            Номер телефону
            <Field name="number" type="tel" className={styles.input} />
            <ErrorMessage name="number" component="div" className={styles.error} />
          </label>

          <button type="submit" className={styles.button}>Додати</button>
        </Form>
      </Formik>
    </div>
  );
}
