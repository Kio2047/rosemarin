import type { APIRecipe } from "./recipeTypes"

export type GlobalState = {
  isAuthenticated: Boolean,
  hasAccount: Boolean,
  recipes: APIRecipe[]
}

export type IDs = {
  id: number,
  id_tasty: number
}