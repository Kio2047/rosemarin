import sequelize from './index';
import { DataTypes } from 'sequelize';
import Ingredient from '../types/Ingredient';
import RecipeModel from './Recipe';

const IngredientModel = sequelize.define<Ingredient>('Ingredient', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    unit: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    quantity: {
        type: DataTypes.STRING,
        allowNull: true
    },
});

export default IngredientModel;
