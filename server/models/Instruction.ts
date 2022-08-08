import { DataTypes } from 'sequelize';
import sequelize from '../models'
import Instruction  from '../types/Instruction';

const InstructionModel = sequelize.define<Instruction>('User', {
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    temperature: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
});

export default InstructionModel