import { configureStore } from '@reduxjs/toolkit';  // Імпортуємо функцію для створення store з Redux Toolkit
import { persistStore, persistReducer } from 'redux-persist'; // Імпортуємо інструменти для збереження store у localStorage

import authReducer from './auth/authSlice'; // Імпортуємо редьюсери (автоматичні оновлювачі стану) для наших частин стану
import contactsReducer from './contacts/contactsSlice';
import filterReducer from './filter/filterSlice';

import { persistAuthConfig } from './auth/persistConfig';

const store = configureStore({
  reducer: {
    auth: persistReducer(persistAuthConfig, authReducer),
    contacts: contactsReducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // тому що persist додає несеріалізовані об'єкти
    }),
});
// Створюємо persistor — об'єкт для запуску механізму збереження store
const persistor = persistStore(store);

export { store, persistor };
