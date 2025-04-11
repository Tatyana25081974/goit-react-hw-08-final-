import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/authSelectors';
import styles from './Navigation.module.css';

export default function Navigation() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={({ isActive }) => isActive ? styles.active : styles.link}>
        Головна
      </NavLink>

      {isLoggedIn && (
        <NavLink to="/contacts" className={({ isActive }) => isActive ? styles.active : styles.link}>
          Контакти
        </NavLink>
      )}
    </nav>
  );
}