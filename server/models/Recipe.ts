import sequelize from './index';
import { DataTypes } from 'sequelize';
import RecipeModel from './types/Recipe';

const  Recipe = sequelize.define<RecipeModel>('Recipe', {
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

export default Recipe;