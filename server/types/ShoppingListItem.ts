import { Model, InferAttributes, InferCreationAttributes } from 'sequelize';

export default interface ShoppingListItem extends Model<InferAttributes<ShoppingListItem>, InferCreationAttributes<ShoppingListItem>> {
  id?: number,
  UserId?: number,
  name: string,
  unit?: string,
  quantity?: string,
}
