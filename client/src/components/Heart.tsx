import React, { useEffect, useState } from 'react';
import { faHeart } from "@fortawesome/fontawesome-free-solid";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { deleteRecipe, postRecipe } from "../Utils/apiDBRecipeService";
import { HeartProps, IDs } from '../types/propTypes';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setIds } from '../redux/actions';


const Heart = ({ recipe }: HeartProps) => {

    // console.log("Here's aaa recipe:", recipe);

    const [isFavorite, setIsFavorite] = useState(false);
    const [currentId, setCurrentId] = useState(0);

    const ids = useAppSelector((state) => state.ids);
    const dispatch = useAppDispatch();

    useEffect(() => {
        ids.map(id => {
            if (id.id_tasty === recipe.id || id.id_tasty === recipe.id_tasty) {
                setIsFavorite(true);
                setCurrentId(id.id);
            };
        });
    }, [ids]);

    const favoriteHelper = (ids: IDs[]) => {
        console.log('Old ids ', ids)
        const newIds = [...ids, { id: currentId, id_tasty: recipe.id }]
        console.log('New ids ', newIds)
        return newIds
    }

    const unfavoriteHelper = (ids: IDs[]) => {
        // console.log('Before filtering ids: ', ids)
        const filtered = ids.filter(id => {
            if (recipe.title) {
                return id.id_tasty !== recipe.id_tasty;
            } else {
                return id.id_tasty !== recipe.id;
            }
        });
        // console.log('After filtering ids: ', [...filtered])
        return [...filtered]
    }

    const isFavoriteHandler = () => {
        if (!isFavorite) {
            setIsFavorite(() => !isFavorite);
            const instructions = recipe.instructions.map((el: any) => {
                // console.log("instructionnnnn:", el);
                let text = el.display_text;
                return { text };
            })
            const ingredients = recipe.sections.map((el: any) => {
                let final = [];
                let res = el.components.map((comp: any) => {
                    // console.log("componentssss:", comp);
                    let name = comp.ingredient.name;
                    let unit = comp.measurements[0].unit.name;
                    let quantity = comp.measurements[0].quantity || null;
                    return { name, unit, quantity };
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
            // console.log('Recipe prop: ', recipe, '\nNewRecipe: ', newRecipe)
            postRecipe(newRecipe)

            dispatch(setIds(favoriteHelper(ids)));

        } else {
            if (window.confirm("You are removing recipe. Are you sure?")) {
                // console.log('Recipe id to use for removal: ', recipe.id)
                setIsFavorite(() => !isFavorite);
                (async () => {
                    const result = await deleteRecipe({ id_tasty: recipe.id })
                    console.log(result)
                    dispatch(setIds(unfavoriteHelper(ids)));
                })();
            }
        }
    }
    return (
        (isFavorite) ?
            <FontAwesomeIcon
                onClick={isFavoriteHandler}
                icon={faHeart as IconProp}
                className="text-2xl self-center mr-3 link text-error cursor-pointer" /> :
            <FontAwesomeIcon
                onClick={isFavoriteHandler}
                icon={faHeart as IconProp}
                className="text-2xl self-center mr-3 link-secondary cursor-pointer" />
    );
};

export default Heart;