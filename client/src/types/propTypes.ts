import React from "react";
import type { FormField } from "./formTypes";
import type { APIRecipe, NewRecipe, SavedRecipe } from "./recipeTypes";

export type IDs = {
  id: number,
  id_tasty: number
}

export type FormActionProps = {
  handleSubmit: (event: React.FormEvent<HTMLButtonElement>) => void,
  text: string,
  validateForm: () => boolean
}

export type InputProps = {
  handleChange: (event: React.FormEvent<HTMLInputElement>) => void,
  value: string,
  labelText: string,
  labelFor: string,
  id: string,
  name: string,
  type: string,
  isRequired: boolean,
  placeholder: string
}

export type IngredientProps = {
  ingredient: string
}

export type RecipesListProps = {
  ids: IDs[],
  setIds: React.Dispatch<React.SetStateAction<IDs[]>>
}

export type HeartProps = {
  recipe: APIRecipe,
  ids: IDs[],
  setIds: React.Dispatch<React.SetStateAction<IDs[]>>
}

export type InstructionProps = {
  instruction: string
}

export type RecipeProps = {
  recipe: APIRecipe,
  className: string,
  setIds: React.Dispatch<React.SetStateAction<IDs[]>>,
  ids: IDs[]
}

type ShoppingListItem = {
  name: string,
  unit: string,
  quantity: string,
  UserId: number,
  id: number
}

export type ShoppingListProps = {
  items: ShoppingListItem[],
  setItems: React.Dispatch<React.SetStateAction<ShoppingListItem[]>>
}

export type MyRecipesProps = {
  myRecipes: SavedRecipe[],
  setMyRecipes: React.Dispatch<React.SetStateAction<SavedRecipe[]>>,
  setIds: React.Dispatch<React.SetStateAction<IDs[]>>,
  ids: IDs[]
}

export type RecipeDetailsProps = {
  myRecipes: SavedRecipe[],
  items: ShoppingListItem[],
  setItems: React.Dispatch<React.SetStateAction<ShoppingListItem[]>>
}
