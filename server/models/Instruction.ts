import { DataTypes } from 'sequelize';
import sequelize from '../models'
import InstructionType  from './types/Instruction';

const Instruction = sequelize.define<InstructionType>('Instruction', {
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