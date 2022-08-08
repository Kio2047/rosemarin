import type { APIRecipe } from "./recipeTypes"

export type state = {
  isAuthenticated: Boolean,
  hasAccount: Boolean,
  recipes: APIRecipe[]
}
