import sequelize from './'
import User from './types/User';
import { DataTypes } from 'sequelize';
import RecipeModel from './Recipe';
import IngredientModel from './Ingredient';
import ShoppingListItemModel from './ShoppingListItem';
import InstructionModel from './Instruction';

const UserModel = sequelize.define<User>('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

/***** ALL ASSOCIATIONS NEED TO BE IN ONE FILE *****/
UserModel.hasMany(RecipeModel, { onDelete: "cascade", foreignKey: 'UserId' });
UserModel.hasMany(ShoppingListItemModel, { onDelete: "cascade", foreignKey: 'UserId' }); 

RecipeModel.belongsTo(UserModel)
ShoppingListItemModel.belongsTo(UserModel) //This will create foreignKey in ShoppingListItem

RecipeModel.hasMany(IngredientModel, { onDelete: "cascade", foreignKey: 'RecipeId'});
RecipeModel.hasMany(InstructionModel, { onDelete: "cascade", foreignKey: 'RecipeId'});

IngredientModel.belongsTo(RecipeModel);
InstructionModel.belongsTo(RecipeModel);
export default UserModel

