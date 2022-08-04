
import { recipeCache } from "../data";

const API_KEY_TASTY = process.env.REACT_APP_API_KEY_TASTY;

const headers = {
  "X-RapidAPI-Key": API_KEY_TASTY,
  "X-RapidAPI-Host": "tasty.p.rapidapi.com",
};
const baseURL = "https://tasty.p.rapidapi.com/recipes/list?from=0&size=20";

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




