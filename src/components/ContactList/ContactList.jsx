
import { useSelector } from 'react-redux';
import { selectVisibleContacts } from '../../redux/contacts/contactsSelectors';
import Contact from '../Contact/Contact';
import styles from './ContactList.module.css';

export default function ContactList() {
  const contacts = useSelector(selectVisibleContacts);

  if (contacts.length === 0) {
    return <p className={styles.empty}>Контактів немає</p>;
  }

  return (
    <ul className={styles.list}>
      {contacts.map(({ id, name, number }) => (
        <Contact key={id} id={id} name={name} number={number} />
      ))}
    </ul>
  );
}