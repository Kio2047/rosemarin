import React from "react";
import type { FormField } from "./formTypes";
import type { IDs } from "./stateTypes";
import type { APIRecipe } from "./recipeTypes";

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
  ingredient: string[]
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