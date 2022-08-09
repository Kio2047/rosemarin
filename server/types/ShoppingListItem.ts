import { Model, InferAttributes, InferCreationAttributes } from 'sequelize';

export default interface ShoppingListItemType extends Model<InferAttributes<ShoppingListItemType>, InferCreationAttributes<ShoppingListItemType>> {
  id?: number,
  UserId?: number,
  name: string,
  unit?: string,
  quantity?: string,
}
