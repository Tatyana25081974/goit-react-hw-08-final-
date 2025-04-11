
import ContactForm from '../../components/ContactForm/ContactForm';
import SearchBox from '../../components/SearchBox/SearchBox';
import ContactList from '../../components/ContactList/ContactList';
import styles from './ContactsPage.module.css';

export default function ContactsPage() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Мої контакти</h1>

      <div className={styles.formsContainer}>
        <div className={styles.formBlock}>
          <ContactForm />
        </div>

        <div className={styles.formBlock}>
         
          <SearchBox />
        </div>
      </div>

      <div className={styles.contactsListContainer}>
        <ContactList />
      </div>
    </div>
  );
}
