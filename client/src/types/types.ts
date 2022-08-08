// modify this once after finding out what recipe properties are actually being used

export type state = {
  isAuthenticated: Boolean,
  hasAccount: Boolean,
  recipes: APIRecipe[]
}

export type APIRecipe = any;

export type savedRecipe = {
  ingredients: savedRecipeIngredient[],
  instructions: savedRecipeInstruction[],
  UserId: number,
  createdAt: string,
  description: string,
  id: number,
  id_tasty: number
  img_alt_text: string,
  img_data: null
  img_url: string,
  title: string,
  total_time: null
  updatedAt: string
}

type savedRecipeIngredient = {
  name: string
  quantity: string
  unit: string
  RecipeId: number
  createdAt: string
  id: number
  updatedAt: string
}

type savedRecipeInstruction = {
  RecipeId: number,
  createdAt: string,
  id: number
  temperature: null
  text: string,
  updatedAt: string
}

export type newRecipe = {
  title: string,
  description: string,
  img_url: string,
  img_alt_text: string,
  ingredients: newRecipeIngredient[],
  instructions: newRecipeInstruction,
  total_time?: null,
  id_tasty?: number
}

type newRecipeIngredient = {
  name: string,
  quantity: string,
  unit: string
}

type newRecipeInstruction = {
  text: string
}

export type shoppingListItem = newRecipeIngredient