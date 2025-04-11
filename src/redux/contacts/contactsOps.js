import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 1. Отримати всі контакти
export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 2. Додати новий контакт
export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', contact);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 3. Видалити контакт
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/contacts/${id}`);
      return id; // Повертаємо id для видалення зі списку
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// 4. Оновити контакт 
export const updateContact = createAsyncThunk(
  'contacts/updateContact',
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await axios.patch(`/contacts/${id}`, updatedData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
