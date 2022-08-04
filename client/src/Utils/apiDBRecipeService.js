const baseDBUrl = 'http://localhost:3001/recipes';

export const getMyRecipes = async () => {
	try {
		const response = await fetch(baseDBUrl)
		const data = await response.json();
		return data;
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
		const data = await response.json();
		return data;
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
		const data = await response.json()
		return data;
	} catch (err) {
		console.log(err)
	}
}