import fs from "fs";
// import {ExReq} from  '../types/request'

import {Request, Response} from 'express'
// import '../types/request'
import RecipeModel from "../models/Recipe";
import IngredientModel from "../models/Ingredient";
import Instruction from "../types/Instruction";
import Ingredient from "../types/Ingredient";
import InstructionModel from "../models/Instruction";
/// <reference> session.d.ts
import * as express from '../types/request'

const createRecipe = async (req: Request, res: Response) => {
  try {
    console.log(req.session);
    if (req.user) {

      const {ingredients, instructions, title, description, img_url, img_data, img_alt_text, total_time, id_tasty} = req.body
      const UserId = req.user.id;
      const newRecipe = await RecipeModel.create({
        title,
        description,
        img_url,
        img_data,
        img_alt_text,
        total_time,
        id_tasty,
        UserId,
      });
  
      ingredients.forEach((ingredient: Ingredient) => {
        IngredientModel.create({
          name: ingredient.name,
          unit: ingredient.unit,
          quantity: ingredient.quantity,
          RecipeId: newRecipe.id,
        });
      });
  
      instructions.forEach((instruction: Instruction) => {
        InstructionModel.create({
          text: instruction.text,
          temperature: instruction.temperature,
          RecipeId: newRecipe.id,
        });
      });
  
      res.status(201).send({ message: "Recipe has been successfully created" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ message: "Due to error recipe has not been created" });
  }
};

const updateRecipe = async (req: Request, res: Response) => {
  try {
    if (req.user){

      const RecipeId = req.params.id;
      const {ingredients, instructions, title, description, img_url, img_data, img_alt_text, total_time, id_tasty} = req.body
      const UserId = req.user.id;    

      await RecipeModel.destroy({ where: { id: RecipeId } });

      const updatedRecipe = await RecipeModel.create({
        title,
        description,
        img_url,
        img_data,
        img_alt_text,
        total_time,
        id_tasty,
        UserId,
      });
  
      ingredients.forEach((ingredient: Ingredient) => {
        IngredientModel.create({
          name: ingredient.name,
          unit: ingredient.unit,
          quantity: ingredient.quantity,
          RecipeId: updatedRecipe.id,
        });
      });
  
      instructions.forEach((instruction: Instruction) => {
        InstructionModel.create({
          text: instruction.text,
          temperature: instruction.temperature,
          RecipeId: updatedRecipe.id,
        });
      });

      res.status(200).send({ message: "Recipe has been successfully updated" });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Due to error recipe has not been updated" });
  }
};

const removeRecipe = async (req: Request, res: Response) => {
  try {
    const id = req.body.id;
    const recipe = await RecipeModel.findByPk(id);
    if (!recipe || !recipe.img_data) {
      await RecipeModel.destroy({ where: { id: id } });
    } else {
      const path = recipe.img_data;
      await RecipeModel.destroy({ where: { id: id } });
      fs.unlinkSync(path);
    }
    res.status(200).send({ message: "Recipe has been successfully removed" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ message: "Due to error recipe has not been created" });
  }
};

const getAllRecipes = async (req: Request, res: Response) => {
  try {
    console.log("Session ", req.session);
    const UserId = req.session.sid;
    const allRecipes = await RecipeModel.findAll({
      where: { UserId },
      include: ["Instructions", "Ingredients"],
    });
    console.log('These are the my recipes: ', allRecipes)
    res.status(200).send(allRecipes);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ message: "Due to error recipes have not been received" });
  }
};

export default { createRecipe, removeRecipe, updateRecipe, getAllRecipes };
