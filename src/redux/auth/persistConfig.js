import storage from 'redux-persist/lib/storage'; // імпорт localStorage

export const persistAuthConfig = {
  key: 'auth',        // ключ для збереження в localStorage
  storage,            // що саме зберігати — localStorage
  whitelist: ['token'], // що саме зберігати зі всього стейта → тільки token
};
