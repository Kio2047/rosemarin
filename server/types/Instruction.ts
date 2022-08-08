import { Model, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

export default interface Instruction extends Model<InferAttributes<Instruction>, InferCreationAttributes<Instruction>> {
  id?: CreationOptional<number>;
  RecipeId?: number,
  text: string;
  temperature: CreationOptional<number>
}
