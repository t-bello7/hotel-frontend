export const loadAuthState = () => {
  try {
    const serializedState = localStorage.getItem('auth');
    if (serializedState === null) {
      return { token: null };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveAuthState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('auth', serializedState);
  } catch (err) {
    return undefined;
  }
  return undefined;
};

export const clearLocalStorage = () => {
  localStorage.clear();
};

export const clearAuthState = () => {
  localStorage.removeItem('auth');
};
