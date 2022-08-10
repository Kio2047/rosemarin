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

async function deleteRecipe(id: number | undefined) {

  //checking if recipe to delete is from homepage
  const recipeFromHomepage = await Recipe.findOne({where: {id_tasty: id}})
  if (!recipeFromHomepage) {
     
    //checking if id is from a recipe stored from db
    const recipeFromDb = await findRecipe(id)
    if (recipeFromDb){
     const res = await Recipe.destroy({where: {id}})
     return res;
    } else {
      throw new Error(`Recipe could not be found [recipe id used: ${id}]`)
    }
  }
/*   if (recipe && recipe.img_data) {
    fs.unlinkSync(recipe.img_data);
  } */
  const res = await Recipe.destroy({where: {id_tasty: id}})
  return res;
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