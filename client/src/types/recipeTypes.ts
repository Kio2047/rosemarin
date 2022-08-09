export type APIRecipe = any;

export type APIRecipeSection = {
  components: APIRecipeSectionComponent[],
  name: string,
  position: number
}

export type APIRecipeSectionComponent = {
  ingredient: { name: string },
  measurements: { quantity: string, unit: {name: string }}[]
}

export type SavedRecipe = {
  Ingredients: SavedRecipeIngredient[],
  Instructions: SavedRecipeInstruction[],
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

type SavedRecipeIngredient = {
  name: string
  quantity: string
  unit: string
  RecipeId: number
  createdAt: string
  id: number
  updatedAt: string
}

type SavedRecipeInstruction = {
  RecipeId: number,
  createdAt: string,
  id: number
  temperature: null
  text: string,
  updatedAt: string
}

export type NewRecipe = {
  title: string,
  description: string,
  img_url: string,
  img_alt_text: string,
  ingredients: NewRecipeIngredient[],
  instructions: NewRecipeInstruction[],
  total_time?: null,
  id?: number,
  id_tasty?: number
}

export type NewRecipeIngredient = {
  name: string,
  quantity: string,
  unit: string
}

type NewRecipeInstruction = {
  text: FormDataEntryValue
}

