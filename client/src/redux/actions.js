export const toggleAuthenticate = () => ({
  type: 'TOGGLE_AUTHENTICATE'
});

export const toggleHasAccount = () => ({
  type: 'TOGGLE_HAS_ACCOUNT', 
});

export const setHasAccount = (status) => ({
  type: 'SET_HAS_ACCOUNT', 
  status
});