import sequelize from './index';
import { DataTypes } from 'sequelize';
import IngredientType from './types/Ingredient';

const Ingredient = sequelize.define<IngredientType>('Ingredient', {
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

