import {combineReducers, AnyAction} from 'redux'
import { PayloadAction } from '@reduxjs/toolkit'

import type { APIRecipe } from '../types/recipeTypes';
// import type { state } from '../types/stateTypes';
// import { store } from './store';

export const isAuthenticated = (state: Boolean = false, action: AnyAction) => {
  console.log(state);
  if (action.type === 'TOGGLE_AUTHENTICATE') {
    return !state;
  } else if (action.type === 'SET_AUTHENTICATE'){
    return action.payload
  }
  return state;
};

export const hasAccount = (state: Boolean = true, action: AnyAction) => {
  if (action.type === "TOGGLE_HAS_ACCOUNT") {
    return !state;
  }
  if (action.type === 'SET_HAS_ACCOUNT') {
    return action.payload;
  }
  return state;
}

export const recipes = (state: APIRecipe[] = [], action: AnyAction) => {
  if (action.type === 'SET_RECIPES'){
    return action.payload
  }
  return state;
}