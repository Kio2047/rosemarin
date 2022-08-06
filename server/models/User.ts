import sequelize from './'
import UserModel from '../types/User';
import { DataTypes } from 'sequelize/types';

const User = sequelize.define<UserModel>('User', {
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

export default User

//NEED TO FIX THESE TWO ONCE 
// User.hasMany(Recipe, { onDelete: "cascade" });
// User.hasMany(ShoppingListItem, { onDelete: "cascade" }); 