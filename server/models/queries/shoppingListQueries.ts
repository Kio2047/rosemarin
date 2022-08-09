import ShoppingListItem from "../ShoppingListItem";
import {ShoppingListItemType} from "../types/ShoppingListItem";



async function createShoppingListItem (item: ShoppingListItemType) {
  const newItem = await ShoppingListItem.create({...item});
  return newItem
}

async function findItem (id: number | undefined) {
  const item = await ShoppingListItem.findByPk(id);
  return item;
}

async function updateItem (item: ShoppingListItemType) {
  const itemFetched = await findItem(item.id);
  if (itemFetched) {
    itemFetched.set({
      ...item
    })
  }
  return itemFetched
}

async function removeItem (id: number) {
  return await ShoppingListItem.destroy({where: {id}})
}

async function getUserItems (UserId: number | undefined) {
  const userItems = await ShoppingListItem.findAll({where: {UserId}})
  return userItems
}

export default {createShoppingListItem, updateItem, removeItem, getUserItems}