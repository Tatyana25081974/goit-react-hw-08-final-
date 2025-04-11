import { Outlet } from 'react-router-dom';
import AppBar from '../components/AppBar/AppBar';
import styles from './Layout.module.css';

export default function Layout() {
  return (
    <div className={styles.layout}>
      <AppBar />   
      <main className={styles.main}>
        <Outlet />   
      </main>
    </div>
  );
}
