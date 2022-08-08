import { recipeCache } from "../data";

const API_KEY_TASTY = process.env.REACT_APP_API_KEY_TASTY;

const headers = new Headers();
headers.append("X-RapidAPI-Key", API_KEY_TASTY!);
headers.append("X-RapidAPI-Host", "tasty.p.rapidapi.com");

const baseURL = "https://tasty.p.rapidapi.com/recipes/list?from=0&size=20";

export const getRandomRecipe = async (tag?: string) => {
	try {
		let tagURL = '';
		if (tag) tagURL = `&tags=${tag}`;
		const response = await fetch(`${baseURL}${tagURL}`, {
			headers
		})
		return await response.json();

	} catch (error) {
		console.log(error)
	}
}