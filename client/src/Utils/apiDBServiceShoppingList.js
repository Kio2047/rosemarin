export const baseDBUrl = 'http://localhost:3001/items';

export const getMyShoppingList = async () => {
  try {
    const response = await fetch(baseDBUrl)
    return await response.json();
   
    } catch (err) {
        console.log(err);
    }
}

export const postItem = async (recipe) => {
  try {
    const response = await fetch(baseDBUrl, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(recipe)
    });
    return await response.json();
    
    } catch (err) {
        console.log(err);
    }
}

export const deleteItem = async (id) => {
  try {  
    const response = await fetch(baseDBUrl, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(id)
    });
    return await response.json()
   
    } catch (err) {
        console.log(err)
    }
}
