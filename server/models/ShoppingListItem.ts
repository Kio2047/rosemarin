import sequelize from './index';
import { DataTypes } from 'sequelize';
import ShoppingListItemType from '../types/ShoppingListItem';

const ShoppingListItem = sequelize.define<ShoppingListItemType>('ShoppingListItem', {
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


export default ShoppingListItem;