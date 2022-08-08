import sequelize from './index';
import { DataTypes } from 'sequelize';
import ShoppingListItem from '../types/ShoppingListItem';

const ShoppingListItemModel = sequelize.define<ShoppingListItem>('ShoppingListItem', {
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


export default ShoppingListItemModel;