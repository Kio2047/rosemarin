import {combineReducers} from 'redux'

const isAuthenticated = (state = false, action ) => {
  if (action.type === 'TOGGLE_AUTHENTICATE') {
    return !state;
  }
  return state;
};

const reducer = combineReducers({
  isAuthenticated
})

export default reducer;