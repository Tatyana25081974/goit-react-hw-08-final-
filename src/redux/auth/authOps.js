import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Базова URL для всіх запитів
axios.defaults.baseURL = 'https://connections-api.goit.global/';

// Додаємо токен в заголовки axios
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Прибираємо токен із заголовків axios
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

// Операція реєстрації нового користувача
export const register = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/users/signup', credentials);
      setAuthHeader(response.data.token); // Вставляємо токен у заголовки
      return response.data; // Повертаємо дані користувача
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Логін користувача
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('/users/login', credentials);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


// Операція виходу користувача
export const logOut = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await axios.post('/users/logout'); // Запит на сервер для логауту
      clearAuthHeader(); // Очищаємо токен у заголовках axios
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Операція оновлення даних користувача за збереженим токеном
export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState(); // Отримуємо весь актуальний Redux-стан
      const token = reduxState.auth.token;   // Беремо токен зі стану

      if (!token) {
        return thunkAPI.rejectWithValue('No token found');
      }

      setAuthHeader(token); // Встановлюємо токен у заголовки
      const response = await axios.get('/users/current'); // Отримуємо дані користувача
      return response.data; // Повертаємо дані
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const reduxState = thunkAPI.getState();
      return reduxState.auth.token !== null; // Запускати тільки якщо токен є!
    },
  }
);

