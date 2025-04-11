import styles from './HomePage.module.css';

export default function HomePage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1 className={styles.title}>Ласкаво просимо до Книги контактів!</h1>
        <p className={styles.text}>
          Тут ви можете зберігати свої контакти та легко керувати ними.
        </p>
        <p className={styles.text}>
          Для початку зареєструйтеся або увійдіть у свій обліковий запис.
        </p>
      </div>
    </div>
  );
}
