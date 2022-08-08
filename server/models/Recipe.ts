import sequelize from './index';
import { DataTypes } from 'sequelize';
import IngredientModel from './Ingredient';
import InstructionModel from './Instruction';
import Recipe from '../types/Recipe';
import UserModel from './User';

const RecipeModel = sequelize.define<Recipe>('Recipe', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    img_url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    img_data: {
        type: DataTypes.BLOB('long'),
        allowNull: true
    },
    img_alt_text: {
        type: DataTypes.STRING,
        allowNull: true
    },
    total_time: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    id_tasty: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
});

export default RecipeModel;