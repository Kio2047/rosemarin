import { Model, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

export default interface InstructionModel extends Model<InferAttributes<InstructionModel>, InferCreationAttributes<InstructionModel>> {
  id?: CreationOptional<number>;
  RecipeId?: number,
  text: string;
  temperature: CreationOptional<number>
}

export interface InstructionType {
  id?: CreationOptional<number>;
  RecipeId?: number,
  text: string;
  temperature: CreationOptional<number>
}
