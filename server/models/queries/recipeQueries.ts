import fs from "fs";
import Ingredient from "../Ingredient";
import Instruction from "../Instruction";
import Recipe from "../Recipe";
import { IngredientType } from "../types/Ingredient";
import { InstructionType } from "../types/Instruction";
import RecipeModel, { RecipeType } from "../types/Recipe";


async function createRecipe(recipe: RecipeType, UserId: number | undefined) {
  const newRecipe = await Recipe.create({
    ...recipe, UserId
  })
  return newRecipe;
}

async function createIngredients(ingredients: IngredientType[], RecipeId: number | undefined) {
   ingredients.forEach((ingredient: IngredientType) => {
    Ingredient.create({
      ...ingredient, RecipeId
    })
  })
}

async function createInstructions(instructions: InstructionType[], RecipeId: number | undefined){
  instructions.forEach((instruction: InstructionType) => {
    Instruction.create({
      ...instruction, RecipeId
    })
  })
}

async function deleteRecipe(RecipeId: number | undefined) {
  const recipe = await findRecipe(RecipeId)
  if (recipe && recipe.img_data) {
    fs.unlinkSync(recipe.img_data);
  }
  await Recipe.destroy({where: {id: RecipeId}})
}

async function findRecipe(RecipeId: number | undefined) {
  const recipe = await Recipe.findByPk(RecipeId);
  return recipe;
}

async function getUserRecipes(UserId: number|undefined) {
  const userRecipes = await Recipe.findAll({
    where: {UserId},
    include: ['Instructions', 'Ingredients']
  })
  return userRecipes
}

export default { createRecipe, createIngredients, createInstructions, deleteRecipe, getUserRecipes }