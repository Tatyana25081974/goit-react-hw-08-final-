import { Navigate } from 'react-router-dom';
// Імпортуємо Navigate — компонент для перенаправлення на іншу сторінку, якщо потрібно
import { useSelector } from 'react-redux';  
// Імпортуємо useSelector — щоб взяти дані зі стану Redux

import { selectIsLoggedIn, selectIsRefreshing } from '../../redux/auth/authSelectors';
// Імпортуємо селектори:
// selectIsLoggedIn — чи користувач увійшов у систему
// selectIsRefreshing — чи зараз оновлюється профіль користувача

export default function PrivateRoute({ component, redirectTo = '/login' }) {
// Створюємо PrivateRoute:
// приймає 2 пропси:
// 1. component → який компонент потрібно показати (наприклад, ContactsPage)
// 2. redirectTo → шлях, куди редіректити (за замовчуванням — на /login)

  const isLoggedIn = useSelector(selectIsLoggedIn);
  // Дістаємо зі стану, чи користувач залогінений

  const isRefreshing = useSelector(selectIsRefreshing);
  // Дістаємо зі стану, чи додаток зараз перевіряє (оновлює) користувача

  const shouldRedirect = !isLoggedIn && !isRefreshing;
  // Якщо користувач НЕ залогінений і НЕ оновлюється — треба редіректити!

  return shouldRedirect
    ? <Navigate to={redirectTo} />
    : component;
  // Якщо треба редіректити — перенаправляємо користувача
  // Якщо все ок — показуємо переданий компонент
}
