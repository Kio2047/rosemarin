import React from 'react';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import Recipe from "../components/Recipe";
import TopSection from "../components/TopSection";
import SearchForm from "../components/SearchForm";
import type { RecipesListProps } from '../types/propTypes';
import type { APIRecipe } from '../types/recipeTypes';

const RecipesList = () => {

    const recipes = useAppSelector((state) => state.recipes);

    return (
        <>
            <TopSection />
            <SearchForm />
            <ul className="bg-transparent container-grid max-w-7xl mx-auto pr-5 pl-5">
                {recipes.map((recipe: APIRecipe, i: number) =>
                    (i === 4 || i%10 === 4 ) ?
                        <Recipe
                            recipe={recipe}
                            key={recipe.id}
                            className={"horizontal span-col-4 card bg-base-100 shadow-xl flex-row"}
                        ></Recipe> :
                        (i === 6 || i%10 === 6) ?
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
        </>
    );
};


export default RecipesList;