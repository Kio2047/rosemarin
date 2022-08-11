import type { ShoppingListItem } from "../types/propTypes";

export const baseDBUrl = 'http://localhost:3001/items';

export const getMyShoppingList = async () => {
  try {
    const response = await fetch(baseDBUrl, {
      credentials: 'include'
    })
    return await response.json();

    } catch (error) {
        console.log(error);
    }
}

export const postItem = async (recipe: ShoppingListItem ) => {
  // console.log("here's what you're checking:", recipe);
  try {
    const response = await fetch(baseDBUrl, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(recipe)
    });
    return await response.json();

    } catch (error) {
        console.log(error);
    }
}

export const deleteItem = async ({id}: {id: number}) => {
  try {
    const response = await fetch(baseDBUrl, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' },
        credentials: 'include', 
        body: JSON.stringify({id})
    });
    return response.ok 

    } catch (error) {
        console.log(error)
    }
};