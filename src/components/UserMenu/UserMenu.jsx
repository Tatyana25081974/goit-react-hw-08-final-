import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/selectors';
import styles from './UserMenu.module.css';

export default function UserMenu() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.greeting}>Вітаю, {user.name}!</p>
      <button type="button" onClick={handleLogout} className={styles.button}>
        Вийти
      </button>
    </div>
  );
}
