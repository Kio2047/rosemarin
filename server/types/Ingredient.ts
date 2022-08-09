import { Model, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

export default interface IngredientType extends Model<InferAttributes<IngredientType>, InferCreationAttributes<IngredientType>> {
  id?: CreationOptional<number>;
  RecipeId?: number,
  name: string,
  unit?: string
  quantity?: string
}
