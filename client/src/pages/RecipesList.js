import React from 'react';
import {useSelector} from 'react-redux';

import Recipe from "../components/Recipe";
import TopSection from "../components/TopSection";
import SearchForm from "../components/SearchForm";

const RecipesList = ({ setIds, ids}) => {

    const recipes = useSelector(state => state.recipes)

    return (
        <>
            <TopSection />
            <SearchForm />
            <ul className="bg-transparent container-grid max-w-7xl mx-auto pr-5 pl-5">
                {recipes.map((recipe, i) =>
                    (i === 4 || i%10 === 4 ) ?
                        <Recipe
                            recipe={recipe}
                            key={recipe.id}
                            className={"horizontal span-col-4 card bg-base-100 shadow-xl flex-row"}
                            setIds={setIds}
                            ids={ids}
                        ></Recipe> :
                        (i === 6 || i%10 === 6) ?
                            <Recipe
                                recipe={recipe}
                                key={recipe.id}
                                className={"vertical span-col-2 span-row-2 card bg-base-100 shadow-xl"}
                                setIds={setIds}
                                ids={ids}
                            ></Recipe> :
                                <Recipe
                                    recipe={recipe}
                                    key={recipe.id} className={"vertical card bg-base-100 shadow-xl"}
                                    setIds={setIds}
                                    ids={ids}
                                ></Recipe>
                )}
            </ul>
        </>
    );
};


export default RecipesList;