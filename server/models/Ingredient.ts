import sequelize from './index';
import { DataTypes } from 'sequelize';
import Recipe from './Recipe';
import IngredientModel from '../types/Ingredient';

const Ingredient = sequelize.define<IngredientModel>('Ingredient', {
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


export default Ingredient;

