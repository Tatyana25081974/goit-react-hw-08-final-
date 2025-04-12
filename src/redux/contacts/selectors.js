import { createSelector } from '@reduxjs/toolkit';
import { selectFilterName, selectFilterNumber } from '../filters/selectors';

// Вибрати всі контакти зі стану
export const selectContacts = (state) => state.contacts.items;

// Вибрати статус завантаження контактів
export const selectIsLoading = (state) => state.contacts.isLoading;

// Вибрати помилку при роботі з контактами
export const selectError = (state) => state.contacts.error;

// Вибрати контакти, які відповідають фільтру
export const selectVisibleContacts = createSelector(
  [selectContacts, selectFilterName, selectFilterNumber],
  (contacts, nameFilter, numberFilter) => {
    const normalizedName = nameFilter.toLowerCase().trim();
    const normalizedNumber = numberFilter.trim();

    return contacts.filter(contact => {
      const nameMatches = contact.name.toLowerCase().includes(normalizedName);
      const numberMatches = contact.number.includes(normalizedNumber);

      //  або ім'я або номер підходить
      return nameMatches || numberMatches;
    });
  }
);
