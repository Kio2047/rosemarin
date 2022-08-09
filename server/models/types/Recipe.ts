import { PathLike } from 'fs';
import { Model, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

export default interface RecipeModel extends Model<InferAttributes<RecipeModel>, InferCreationAttributes<RecipeModel>> {
  id?: number;
  UserId?: number,
  title: string,
  description?: string,
  img_url?: string,
  img_data?: PathLike, 
  img_alt_text?: string,
  total_time?: number,
  id_tasty?: number, 
}

export interface RecipeType {
  id?: number;
  UserId?: number,
  title: string,
  description?: string,
  img_url?: string,
  img_data?: PathLike, 
  img_alt_text?: string,
  total_time?: number,
  id_tasty?: number, 
}
