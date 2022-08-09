import {combineReducers, AnyAction} from 'redux'
import { PayloadAction } from '@reduxjs/toolkit'

import type { APIRecipe, SavedRecipe } from '../types/recipeTypes';
import type { ShoppingListItem } from '../types/propTypes';
import type { IDs } from '../types/propTypes';
// import type { state } from '../types/stateTypes';
// import { store } from './store';

export const isAuthenticated = (state: Boolean = false, action: AnyAction): Boolean => {
  console.log(state);
  if (action.type === 'TOGGLE_AUTHENTICATE') {
    return !state;
  } else if (action.type === 'SET_AUTHENTICATE'){
    return action.payload
  }
  return state;
};

export const hasAccount = (state: Boolean = true, action: AnyAction): Boolean => {
  if (action.type === "TOGGLE_HAS_ACCOUNT") {
    return !state;
  }
  if (action.type === 'SET_HAS_ACCOUNT') {
    return action.payload;
  }
  return state;
}

export const recipes = (state: APIRecipe[] = [], action: AnyAction): APIRecipe[] => {
  if (action.type === 'SET_RECIPES'){
    return action.payload
  }
  return state;
}

export const myRecipes = (state: SavedRecipe[] = [], action: AnyAction): SavedRecipe[] => {
  if (action.type === 'SET_MY_RECIPES') {
    return action.payload
  }
  return state;
}

export const ids = (state: IDs[] = [], action: AnyAction): IDs[] => {
  if (action.type === 'SET_IDS') {
    return action.payload
  }
  return state;
}

export const items = (state: ShoppingListItem[] = [], action: AnyAction): ShoppingListItem[] => {
  if (action.type === 'SET_ITEMS') {
    return action.payload
  }
  return state;
}