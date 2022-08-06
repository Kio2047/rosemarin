import {combineReducers} from 'redux'

const isAuthenticated = (state = false, action) => {
  if (action.type === 'TOGGLE_AUTHENTICATE') {
    return !state;
  } else if (action.type === 'SET_AUTHENTICATE'){
    return action.status
  }
  return state;
};

const hasAccount = (state = true, action) => {
  if (action.type === "TOGGLE_HAS_ACCOUNT") {
    return !state;
  }
  if (action.type === 'SET_HAS_ACCOUNT') {
    return action.status;
  }
  return state;
}

const recipes = (state = [], action) => {
  if (action.type === 'SET_RECIPES'){
    return action.payload
  }
  return state;
}

const reducer = combineReducers({
  isAuthenticated, 
  hasAccount,
  recipes
})

export default reducer;