import type { recipe } from "./reduxTypes";

export const toggleAuthenticate = () => ({
  type: 'TOGGLE_AUTHENTICATE'
});

export const setAuthenticate = (status: boolean) => ({
  type: 'SET_AUTHENTICATE',
  payload: status
})

export const toggleHasAccount = () => ({
  type: 'TOGGLE_HAS_ACCOUNT',
});

export const setHasAccount = (status: boolean) => ({
  type: 'SET_HAS_ACCOUNT',
  payload: status
});

export const setRecipes = (payload: recipe[]) => ({
  type: 'SET_RECIPES',
  payload
})