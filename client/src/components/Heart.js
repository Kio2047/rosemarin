import React, {useEffect, useState} from 'react';

import {faHeart} from "@fortawesome/fontawesome-free-solid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {deleteRecipe, getMyRecipes, postRecipe} from "../Utils/apiDBRecipeService";
import { useDispatch, useSelector } from 'react-redux';



const Heart = ({recipe, ids, setIds}) => {

    const [isFavorite, setIsFavorite] = useState(false);
    const [currentId, setCurrentId] = useState(0);
    // const ids = useSelector(state => state.ids);
    const dispatch = useDispatch();


    useEffect(() => {
        ids.map((id) => {
            if (id.id_tasty === recipe.id || id.id_tasty === recipe.id_tasty) {
                setIsFavorite(true);
                setCurrentId(id.id);
            }
        })
    }, [ids]);

    const favoriteHelper = (ids) => {  
       return ids = [...ids, {id: currentId, id_tasty: recipe.id}] 
    }

    const unfavoriteHelper = (ids) => {
        const filtered = ids.filter(id => id.id !== currentId);
        return [...filtered]
    
    }

    

  

    const isFavoriteHandler = () => {
        setIsFavorite(() => !isFavorite);
        if (!isFavorite) {
            const instructions = recipe.instructions.map(el => {
                let text = el.display_text;
                return {text}
            })
            const ingredients = recipe.sections.map(el => {
                let final = [];
                let res = el.components.map(comp => {
                    let name = comp.ingredient.name;
                    let unit = comp.measurements[0].unit.name;
                    let quantity = comp.measurements[0].quantity || null;
                    return {name, unit, quantity};
                })
                final.push(res);
                return final.flat();
            });

            const newRecipe = {
                title: recipe.name,
                description: recipe.description,
                img_url: recipe.thumbnail_url,
                img_alt_text: recipe.name,
                total_time: recipe.total_time_minutes,
                id_tasty: recipe.id,
                ingredients: ingredients.flat(),
                instructions: instructions
            }
            postRecipe(newRecipe)
                .then(res => console.log(res))
                .catch(error => console.log(error))

            dispatch(setIds(favoriteHelper(ids)));

        } else {
            if (window.confirm("You are removing recipe. Are you sure?")) {
                deleteRecipe({id: currentId})
                    .then(res => console.log(res))
                    .catch(error => console.log(error))
                dispatch(setIds(unfavoriteHelper(ids)))
            }
        }

    }
    return (
        (isFavorite) ?
            <FontAwesomeIcon
                onClick={isFavoriteHandler}
                icon={faHeart}
                className="text-2xl self-center mr-3 link text-error cursor-pointer"/> :
            <FontAwesomeIcon
                onClick={isFavoriteHandler}
                icon={faHeart}
                className="text-2xl self-center mr-3 link-secondary cursor-pointer"/>
    );
};

export default Heart;