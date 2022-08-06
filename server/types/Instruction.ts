import { Model, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

export default interface InstructionModel extends Model<InferAttributes<InstructionModel>, InferCreationAttributes<InstructionModel>> {
  id?: CreationOptional<number>;
  text: string;
  temperature: CreationOptional<number>
}
