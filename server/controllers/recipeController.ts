import {Request, Response} from 'express'

import Model from '../models/queries/recipeQueries'
/// <reference> session.d.ts
import * as express from '../models/types/request'

const createRecipe = async (req: Request, res: Response) => {
  try {
    console.log('recipeController, createRecipe :', req.session);
    if (req.user) {
      const {instructions, ingredients} = req.body
      const {title, description, img_url, img_data, img_alt_text, total_time, id_tasty} = req.body
      const recipe = {title, description, img_url, img_data, img_alt_text, total_time, id_tasty};
      const UserId = req.user.id;

      const newRecipe = await Model.createRecipe(recipe, UserId)
      Model.createIngredients(ingredients, newRecipe.id);
      Model.createInstructions(instructions, newRecipe.id);

      console.log('Recipe successfully created 🟢');
      res.status(201).send({ message: "Recipe has been successfully created" });
    } else {
      console.log('No user in the request body 🔴')
    }
  } catch (error) {
    console.log('recipeController, createRecipe error 🔴', error);
    res.status(500).send({ message: "Due to error recipe has not been created" });
  }
};

const updateRecipe = async (req: Request, res: Response) => {
  try {
    if (req.user){
      const RecipeId = +req.params.id;
      const {instructions, ingredients} = req.body
      const {title, description, img_url, img_data, img_alt_text, total_time, id_tasty} = req.body
      const recipe = {title, description, img_url, img_data, img_alt_text, total_time, id_tasty};
      const UserId = req.user.id;

      await Model.deleteRecipe(RecipeId);
      const updatedRecipe = await Model.createRecipe(recipe, UserId)
      Model.createIngredients(ingredients, updatedRecipe.id);
      Model.createInstructions(instructions, updatedRecipe.id)

      console.log('Recipe successfully updated 🟢');
      res.status(200).send({ message: "Recipe has been successfully updated" });
    }
  } catch (error) {
    console.log('recipeController, updateRecipe error 🔴', error);
    res.status(500).send({ message: "Due to error recipe has not been updated" });
  }
};

const removeRecipe = async (req: Request, res: Response) => {
  try {
    const RecipeId = req.body.id;
    await Model.deleteRecipe(RecipeId);

    console.log('Recipe successfully removed 🟢');
    res.status(200).send({ message: "Recipe has been successfully removed" });
  } catch (error) {
    console.log('recipeController, removeRecipe error 🔴', error);
    res.status(500).send({ message: "Due to error recipe has not been removed" });
  }
};

const getUserRecipes = async (req: Request, res: Response) => {
  try {
    // console.log("recipeController, getUserRecipes session: ", req.session);
    const UserId = req.session.sid;
    const userRecipes = await Model.getUserRecipes(UserId);

    console.log('Recipes successfully fetched 🟢', userRecipes);
    res.status(200).send(userRecipes);
  } catch (error) {
    console.log('recipeController, getUserRecipes error 🔴', error);
    res.status(500).send({ message: "Due to error recipes have not been received" });
  }
};

export default { createRecipe, removeRecipe, updateRecipe, getUserRecipes };
