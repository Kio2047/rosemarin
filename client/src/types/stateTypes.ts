import { IDs, ShoppingListItem } from "./propTypes"
import type { APIRecipe, SavedRecipe } from "./recipeTypes"

export type GlobalState = {
  isAuthenticated: Boolean,
  hasAccount: Boolean,
  recipes: APIRecipe[],
  myRecipes: SavedRecipe[],
  ids: IDs[],
  items: ShoppingListItem[]
}