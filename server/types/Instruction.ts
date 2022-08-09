import { Model, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

export default interface InstructionType extends Model<InferAttributes<InstructionType>, InferCreationAttributes<InstructionType>> {
  id?: CreationOptional<number>;
  RecipeId?: number,
  text: string;
  temperature: CreationOptional<number>
}
