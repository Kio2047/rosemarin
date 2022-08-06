import { Model, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

export default interface RecipeModel extends Model<InferAttributes<RecipeModel>, InferCreationAttributes<RecipeModel>> {
  id?: CreationOptional<number>;
  title: string,
  description?: string,
  img_url?: string,
  img_data?: string, 
  img_alt_text?: string,
  total_time?: number,
  id_tasty?: number, 
}
