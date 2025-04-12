import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { deleteContact } from '../../redux/contacts/operations';
import { toast } from 'react-hot-toast';
import styles from './Contact.module.css';
import EditContactDialog from '../EditContactDialog/EditContactDialog';

export default function Contact({ id, name, number }) {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false); // Стейт для контролю модалки

  // Функція для видалення контакту
  const handleDelete = async () => {
    const isConfirmed = window.confirm(`Ви впевнені, що хочете видалити ${name}?`);

    if (!isConfirmed) {
      return; // Якщо користувач передумав
    }

    try {
      await dispatch(deleteContact(id)).unwrap(); // Очікуємо завершення видалення
      toast.success('Контакт успішно видалено! 🗑️');
    } catch {
      toast.error('Помилка при видаленні контакту. Спробуйте ще раз.');
    }
  };

  return (
    <li className={styles.item}>
      <p className={styles.text}>
        {name}: {number}
      </p>

      {/* Кнопки для редагування і видалення */}
      <div className={styles.buttons}>
        <button
          onClick={() => setOpenDialog(true)}
          className={`${styles.button} ${styles.editButton}`}
        >
          Редагувати
        </button>

        <button
          onClick={handleDelete}
          className={`${styles.button} ${styles.deleteButton}`}
        >
          Видалити
        </button>
      </div>

      {/* Модалка для редагування */}
      <EditContactDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        id={id}
        initialName={name}
        initialNumber={number}
      />
    </li>
  );
}
