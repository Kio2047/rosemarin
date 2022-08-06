import React, {useState} from 'react';
import {getRandomRecipe} from "../Utils/apiRecipeService";
import {options} from '../data';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { setRecipes } from '../redux/actions';

const SearchForm = ({categories}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    function searchHandler(event) {
        event.preventDefault();
        (async () => {
           const taggedRecipes = await getRandomRecipe(event.target.search.value)
            dispatch(setRecipes(taggedRecipes.results))
            navigate("../home", { replace: true })
        })();
    }

    return (
        <div className="form-control">
            <div className="input-group">
                <form className="w-full m-8 flex justify-center items-center" onSubmit={searchHandler}>
                    <h3 className="font-rufina-bold text-2xl mr-8 subpixel-antialiased">Let's find something special</h3>
                    <select className="select select-bordered w-1/3" placeholder="Search by category" name="search">
                        {options.map(option => <option value={option.name} key={option.id}>{option.display_name}</option>)}
                    </select>
                    <button type="submit" className="btn btn-neutral">Search</button>
                </form>
            </div>
        </div>
    );
};

export default SearchForm;