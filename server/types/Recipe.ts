import { Model, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

export default interface Recipe extends Model<InferAttributes<Recipe>, InferCreationAttributes<Recipe>> {
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
