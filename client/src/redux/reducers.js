import {combineReducers} from 'redux'

const isAuthenticated = (state = false, action) => {
  if (action.type === 'TOGGLE_AUTHENTICATE') {
    return !state;
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

const reducer = combineReducers({
  isAuthenticated, 
  hasAccount
})

export default reducer;