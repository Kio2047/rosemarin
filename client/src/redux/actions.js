export const toggleAuthenticate = () => ({
  type: 'TOGGLE_AUTHENTICATE'
});

export const setAuthenticate = (status) => ({
  type: 'SET_AUTHENTICATE',
  status
})

export const toggleHasAccount = () => ({
  type: 'TOGGLE_HAS_ACCOUNT',
});

export const setHasAccount = (status) => ({
  type: 'SET_HAS_ACCOUNT',
  status
});

export const setRecipes = (payload) => ({
  type: 'SET_RECIPES',
  payload
})

export const setMyRecipes = (payload) => ({
  type: 'SET_MY_RECIPES',
  payload
})

export const setIds = (payload) => ({
  type: 'SET_IDS',
  payload
})

export const setItems = (payload) => ({
  type: 'SET_ITEMS',
  payload
})

