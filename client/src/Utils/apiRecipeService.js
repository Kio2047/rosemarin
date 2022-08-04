import {recipeCache} from "../data";

const headers = {
	'X-RapidAPI-Key': '20d2d622c5mshefaea8f4fc1579fp145ccbjsn1662f35c8e98',
	'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
};
const baseURL = 'https://tasty.p.rapidapi.com/recipes/list?from=0&size=20'


export const getRandomRecipe = async (tag) => {
	try {
		let tagURL = '';
		if (tag) tagURL = `&tags=${tag}`;
		const response = await fetch(`${baseURL}${tagURL}`, {
			method: 'GET',
			headers: headers
		})
		return await response.json();
		
	} catch (err) {
		console.log(err)
	}
}




