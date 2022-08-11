import { RootState } from "../../redux/store";
import { recipeCache } from "../../data";

const recipes = recipeCache.slice(0, 20);

export const freshLoginTestState: RootState = {
  isAuthenticated: true,
  hasAccount: true,
  recipes,
  myRecipes: [],
  ids: [],
  items: [],
}