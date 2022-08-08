import type { shoppingListItem } from "../types";

export const baseDBUrl = 'http://localhost:3001/items';

export const getMyShoppingList = async () => {
  try {
    const response = await fetch(baseDBUrl)
    return await response.json();

    } catch (error) {
        console.log(error);
    }
}

export const postItem = async (recipe: shoppingListItem ) => {
  // console.log("here's what you're checking:", recipe);
  try {
    const response = await fetch(baseDBUrl, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(recipe)
    });
    return await response.json();

    } catch (error) {
        console.log(error);
    }
}

export const deleteItem = async (id: number) => {
  try {
    const response = await fetch(baseDBUrl, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(id)
    });
    return await response.json()

    } catch (error) {
        console.log(error)
    }
}
