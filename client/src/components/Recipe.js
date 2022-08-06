import React from 'react';
import {Link} from "react-router-dom";
import Heart from "./Heart";



const Recipe = ({ recipe, className, ids, setIds }) => {
    return (
        <li className={className}>
            <figure><img  src={ recipe.thumbnail_url || recipe.img_url || recipe.img_data } alt={ recipe.name || recipe.title }/></figure>
            <div className="card-body">
                <h2 className="card-title font-rufina-bold">{ recipe.name || recipe.title }</h2>

                <div className="card-actions justify-end flex justify-between">
                    {
                        (recipe.instructions || recipe.Instructions) ? <Heart ids={ids} setIds={setIds} recipe={recipe} /> : <div className="text-2xl self-center mr-3">&#127910;</div>
                    }

                    <Link to={/recipes/ + (recipe.id_tasty || recipe.id)} className="btn btn-warning font-rufina-regular">Details</Link>
                </div>
            </div>
        </li>
    );
};

export default Recipe;