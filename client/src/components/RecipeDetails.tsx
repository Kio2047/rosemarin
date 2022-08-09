import React, {useContext, useEffect, useState} from 'react';

import {useParams} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { Icon, IconProp } from "@fortawesome/fontawesome-svg-core";
import {getMyShoppingList, postItem} from "../Utils/apiDBServiceShoppingList";
import { useAppSelector } from '../redux/hooks';
import { RecipeDetailsProps } from '../types/propTypes';
import { APIRecipe, APIRecipeSection, SavedRecipe, ShoppingListItem } from '../types/recipeTypes';


const RecipeDetails = ({myRecipes, items, setItems}: RecipeDetailsProps) => {

    console.log("myRecipes:", myRecipes);

    const recipes = useAppSelector(state => state.recipes);

    const [recipe, setRecipe] = useState<APIRecipe | undefined>();
    const [myRecipe, setMyRecipe] = useState<SavedRecipe | undefined>();

    const {id} = useParams();

    useEffect(() => {
        const result = recipes.find(res=> +id! === res.id);
        setRecipe(result);
    }, []);

    useEffect(() => {
        const result = myRecipes.find(res => +id! === res.id);
        setMyRecipe(result);
    }, []);

    const addHandlerShoppingList = (data: ShoppingListItem) => {
        const newItem = {
            name: data.name,
            quantity: data.quantity,
            unit: data.unit,
        };
        postItem(newItem)
            .then(res => setItems((prev) => [...prev, res]))
            .catch(error => console.log(error));
    };

    if (recipe || myRecipe) return (
        <>
        <div className="h-[300px] flex justify-between items-center">
            <div className="bg-top-img3 w-full h-full bg-auto bg-no-repeat bg-center bg-cover"></div>
        </div>
        <div className="bg-base-100 shadow-xl max-w-screen-xl m-auto my-20 prose lg:prose-xl">
            <h2 className="card-title font-rufina-bold block text-center">{recipe ? recipe.name : myRecipe?.title}</h2>
            <div className="flex">
                <figure className="max-w-lg ml-10">
                    <img
                        src={recipe ? recipe.thumbnail_url : myRecipe?.img_url ? myRecipe.img_url : myRecipe?.img_data ? myRecipe?.img_data : "Image"}
                        alt={recipe ? recipe.name : myRecipe?.title}/>
                </figure>
                <div>
                    <p className="mx-28 pt-5">{recipe ? recipe.description : myRecipe?.description}</p>
                </div>
            </div>
            <div className="card-body">
                <h3 className="font-rufina-bold block text-center mt-0">Ingredients</h3>
                <div className="overflow-x-auto">
                    <table className="table w-5/6 m-auto relative z-0">
                        <thead>
                        <tr>
                            <th><span className="pl-4">Name</span></th>
                            <th>Quantity</th>
                            <th>Unit</th>
                            <th>Shopping List</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            (recipe) ?
                                recipe.sections?.map((section: APIRecipeSection) => {
                                    return section.components.map((component, i) =>
                                        <tr key={i}>
                                            <th>{component.ingredient.name}</th>
                                            <td>{component.measurements[0].quantity}</td>
                                            <td>{component.measurements[0].unit.name}</td>
                                            <td><label className="swap swap-rotate">
                                                <input type="checkbox" />
                                                <FontAwesomeIcon
                                                    icon={"fa-solid fa-plus" as IconProp}
                                                    className="swap-on text-warning transition-all hover:text-orange-800 ml-10 justify-center text-xl cursor-pointer"
                                                    onClick={() => addHandlerShoppingList({name: component.ingredient.name, quantity: component.measurements[0].quantity, unit: component.measurements[0].unit.name})}
                                                />
                                                <FontAwesomeIcon
                                                    icon={"fa-solid fa-plus" as IconProp}
                                                    className="swap-off text-secondary transition-all hover:text-orange-800 ml-10 justify-center text-xl cursor-pointer"
                                                    onClick={() => addHandlerShoppingList({name: component.ingredient.name, quantity: component.measurements[0].quantity, unit: component.measurements[0].unit.name})}
                                                />
                                            </label>
                                            </td>
                                        </tr>)
                                }) :
                                myRecipe?.Ingredients.map((ingredient, i) =>
                                    <tr key={i}>
                                        <th>{ingredient.name}</th>
                                        <td>{ingredient.quantity}</td>
                                        <td>{ingredient.unit}</td>
                                        <td><FontAwesomeIcon
                                            icon={"fa-solid fa-plus" as IconProp}
                                            className="text-warning transition-all hover:text-2xl ml-10"
                                            onClick={() => addHandlerShoppingList({name: ingredient.name, quantity: ingredient.quantity, unit: ingredient.unit})}
                                        /></td>
                                    </tr>)
                        }
                        </tbody>
                    </table>
                </div>
                <h3 className="font-rufina-bold block text-center">Instructions</h3>
                {
                    recipe ?
                        recipe.instructions?.map((instruction: any, i: number) => <p className="w-5/6 m-auto" key={i}>{instruction.display_text}</p>) :
                        myRecipe?.Instructions?.map((instruction, i) => <p className="w-5/6 m-auto" key={i}>{instruction.text}</p>)
                }
                {
                    myRecipe ? null : recipe.renditions ? recipe.renditions?.map((url: { url: string }, i: number) => <a key={i}
                                                                             className="link-secondary text-center" href={url.url} target="_blank">{url.url}</a>,<br />) : <span></span>
                }
                <div className="card-actions justify-end">
                    <button className="btn btn-warning">Details</button>
                </div>
            </div>
        </div>
        </>
    );
};

export default RecipeDetails;