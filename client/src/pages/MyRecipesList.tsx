import React, { useEffect, useState } from 'react';
import TopSection from "../components/TopSection";
import SearchForm from "../components/SearchForm";
import Recipe from "../components/Recipe";
import { getMyRecipes } from "../Utils/apiDBRecipeService";

import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setMyRecipes, setIds } from '../redux/actions';
import { SavedRecipe } from '../types/recipeTypes';
import { IDs } from '../types/propTypes';

const MyRecipesList = () => {

    const dispatch = useAppDispatch();
    const myRecipes = useAppSelector((state) => state.myRecipes)
    const ids = useAppSelector((state) => state.ids)



    const idsHelper = (recipe: SavedRecipe, ids: IDs[]) => {
        const filtered = ids.filter(id => id.id_tasty !== recipe.id_tasty);
        return [...filtered, { id: recipe.id, id_tasty: recipe.id_tasty }]
    }

    useEffect(() => {
        (async () => {
            try {
                const recipes = await getMyRecipes()
                if (recipes) recipes.map(el => (dispatch(setIds(idsHelper(el, ids)))))
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    useEffect(() => {
        (async () => {
            try {
                const recipes = await getMyRecipes();
                console.log('Am i being called? ', recipes)
                dispatch(setMyRecipes(recipes || []))
            } catch (error) {
                console.log(error)
            }
        })()
    }, [ids])

    return (
        <div className="mb-20">
            <TopSection />
            <div className="prose lg:prose-xl  m-auto mb-10 text-center mt-4">
                <h2 className="m-auto font-rufina-bold">List of favourite recipes</h2>
            </div>
            {/* <SearchForm /> */}

            <ul className="bg-transparent container-grid max-w-7xl mx-auto pr-5 pl-5">
                {myRecipes.map((recipe, i) =>
                    (i === 4 || i % 10 === 4) ?
                        <Recipe
                            recipe={recipe}
                            key={recipe.id}
                            className={"horizontal span-col-4 card bg-base-100 shadow-xl flex-row"}
                        ></Recipe> :
                        (i === 6 || i % 10 === 6) ?
                            <Recipe
                                recipe={recipe}
                                key={recipe.id}
                                className={"vertical span-col-2 span-row-2 card bg-base-100 shadow-xl"}
                            ></Recipe> :
                            <Recipe
                                recipe={recipe}
                                key={recipe.id} className={"vertical card bg-base-100 shadow-xl"}
                            ></Recipe>
                )}
            </ul>
        </div>
    );
};

export default MyRecipesList;