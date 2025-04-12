import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  number: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    // окрема дія для зміни імені
    setNameFilter(state, action) {
      state.name = action.payload; 
    },
    // окрема дія для зміни номера
    setNumberFilter(state, action) {
      state.number = action.payload;
    },
  },
});


export const { setNameFilter, setNumberFilter } = filterSlice.actions;

export default filterSlice.reducer;
