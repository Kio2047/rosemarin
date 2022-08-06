import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import sequelize from '../models'
import InstructionModel  from '../types/Instruction';
// We recommend you declare an interface for the attributes, for stricter typechecking


const Instruction = sequelize.define<InstructionModel>('User', {
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    temperature: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
});

export default Instruction