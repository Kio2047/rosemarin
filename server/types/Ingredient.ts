import { Model, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

export default interface Ingredient extends Model<InferAttributes<Ingredient>, InferCreationAttributes<Ingredient>> {
  id?: CreationOptional<number>;
  RecipeId?: number,
  name: string,
  unit?: string
  quantity?: string
}
