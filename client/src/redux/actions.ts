import type { APIRecipe, SavedRecipe } from "../types/recipeTypes";
import type { ShoppingListItem } from "../types/propTypes";
import type { IDs } from "../types/propTypes";

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

export const setRecipes = (payload: APIRecipe[]) => ({
  type: 'SET_RECIPES',
  payload
})

export const setMyRecipes = (payload: SavedRecipe[]) => ({
  type: 'SET_MY_RECIPES',
  payload
});

export const setIds = (payload: IDs[]) => ({
  type: 'SET_IDS',
  payload
  });

export const setItems = (payload: ShoppingListItem[]) => ({
  type: 'SET_ITEMS',
  payload
});