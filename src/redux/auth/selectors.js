// Вибрати чи користувач залогінений
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

// Вибрати токен користувача
export const selectToken = (state) => state.auth.token;

// Вибрати об'єкт користувача (name, email)
export const selectUser = (state) => state.auth.user;

// Вибрати статус оновлення профілю
export const selectIsRefreshing = (state) => state.auth.isRefreshing;