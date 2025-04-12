import { createSelector } from '@reduxjs/toolkit';
import { selectFilter } from '../filter/filterSelectors';

// Вибрати всі контакти зі стану
export const selectContacts = (state) => state.contacts.items;

// Вибрати статус завантаження контактів
export const selectIsLoading = (state) => state.contacts.isLoading;

// Вибрати помилку при роботі з контактами
export const selectError = (state) => state.contacts.error;

// Вибрати контакти, які відповідають фільтру
export const selectVisibleContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    if (!filter.trim()) {
      return contacts;
    }
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);