import { Model, InferAttributes, InferCreationAttributes } from 'sequelize';

export default interface ShoppingListItemModel extends Model<InferAttributes<ShoppingListItemModel>, InferCreationAttributes<ShoppingListItemModel>> {
  id?: number,
  UserId?: number,
  name: string,
  unit?: string,
  quantity?: string,
}

export interface ShoppingListItemType {
  id?: number,
  UserId?: number,
  name: string,
  unit?: string,
  quantity?: string,
}
