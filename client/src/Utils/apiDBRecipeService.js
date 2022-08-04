const baseDBUrl = 'http://localhost:3001/recipes';

export const getMyRecipes = async () => {
	try {
		const response = await fetch(baseDBUrl)
		return await response.json();
		
	} catch (err) {
		console.log(err);
	}
}

export const postRecipe = async (recipe) => {
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

export const deleteRecipe = async (id) => {
	try {
		const response = await fetch(
			baseDBUrl, {
			method: 'DELETE',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify(id)
		})
		return await response.json()
		
	} catch (err) {
		console.log(err)
	}
}