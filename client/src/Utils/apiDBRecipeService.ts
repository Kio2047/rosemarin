import type { NewRecipe } from "../types/recipeTypes";

const baseDBUrl = 'http://localhost:3001/recipes';

export const getMyRecipes = async () => {
	try {
		const response = await fetch(baseDBUrl, {
			credentials: 'include',
		})
		return await response.json();

	} catch (error) {
		console.log(error);
	}
}

export const postRecipe = async (recipe: NewRecipe) => {
	try {
		// console.log('This is the new recipe: ', recipe);
		const response = await fetch(baseDBUrl, {
			method: 'POST',
			credentials: 'include',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify(recipe)
		});
		return await response.json();

	} catch (error) {
		console.log(error);
	}
}

export const deleteRecipe = async (id: number) => {
	try {
		const response = await fetch(
			baseDBUrl, {
			method: 'DELETE',
			credentials: 'include',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify(id)
		})
		return await response.json()

	} catch (error) {
		console.log(error)
	}
}