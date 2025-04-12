import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: '', // Спочатку фільтр порожній
  reducers: {
    setFilter(state, action) {
      return action.payload;
    },
  },
});

// Експортуємо дію (action)
export const { setFilter } = filterSlice.actions;

// Експортуємо редьюсер
export default filterSlice.reducer;
