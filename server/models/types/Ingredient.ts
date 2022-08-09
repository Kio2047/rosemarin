import { Model, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

export default interface IngredientModel extends Model<InferAttributes<IngredientModel>, InferCreationAttributes<IngredientModel>> {
  id?: CreationOptional<number>;
  RecipeId?: number,
  name: string,
  unit?: string
  quantity?: string
}


export interface IngredientType {
  id?: number;
  RecipeId?: number,
  name: string,
  unit?: string
  quantity?: string
}
