import React, {useEffect, useState} from 'react';
import TopSection from "../components/TopSection";
import SearchForm from "../components/SearchForm";
import Recipe from "../components/Recipe";
import {getMyRecipes} from "../Utils/apiDBRecipeService";

import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setMyRecipes } from '../redux/actions';

const MyRecipesList = () => {

    const dispatch = useAppDispatch();
    const myRecipes = useAppSelector((state) => state.myRecipes)
    const ids = useAppSelector((state) => state.ids)

    useEffect(() => {
        getMyRecipes()
            // .then(recipes => console.log(recipes))
            .then(recipes => {
                console.log('My recipes inside: ', recipes )
                dispatch(setMyRecipes(recipes || []));
            })
            .catch(err => console.log.bind(err))
    }, [ids])


    return (
        <div className="mb-20">
            <TopSection />
            <div className="prose lg:prose-xl  m-auto mb-10 text-center">
                <h2 className="m-auto font-rufina-bold ">List of favourite recipes</h2>
            </div>
            <SearchForm />

            <ul className="bg-transparent container-grid max-w-7xl mx-auto pr-5 pl-5">
                {myRecipes.map((recipe, i) => {
                   if (i % 6 === 0) {
                      return <Recipe
                           recipe={recipe}
                           key={recipe.id}
                           className={"horizontal span-col-4 card bg-base-100 shadow-xl flex-row"}
                           />
                   } else if (i % 5 === 0) {
                       return <Recipe
                           recipe={recipe}
                           key={recipe.id}
                           className={"vertical span-col-2 span-row-2 card bg-base-100 shadow-xl"}
                           />
                   } else {
                       return <Recipe
                            recipe={recipe}
                            key={recipe.id}
                            className={"vertical card bg-base-100 shadow-xl"}
                            />
                   }})}
            </ul>
        </div>
    );
};

export default MyRecipesList;