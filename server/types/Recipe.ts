import { Model, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

export default interface RecipeType extends Model<InferAttributes<RecipeType>, InferCreationAttributes<RecipeType>> {
  id?: CreationOptional<number>;
  UserId?: number,
  title: string,
  description?: string,
  img_url?: string,
  img_data?: string, 
  img_alt_text?: string,
  total_time?: number,
  id_tasty?: number, 
}
