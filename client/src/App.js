import React, {useEffect, useState, useContext} from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import RecipesList from "./pages/RecipesList";
import {getCategory, getRandomRecipe} from './Utils/apiRecipeService';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import MyRecipesList from "./pages/MyRecipesList";
import CreateRecipe from "./pages/CreateRecipe";
import ShoppingList from "./pages/ShoppingList";
import Menu from "./pages/Menu";
import WeeklyMenu from "./pages/WeeklyMenu";
import RecipeDetails from "./components/RecipeDetails";
import { getMyRecipes } from "./Utils/apiDBRecipeService";
import Logout from "./pages/Logout";
import SignIn from './pages/SignIn';
import { useAppSelector, useAppDispatch } from './redux/hooks';
import { setAuthenticate, setRecipes, setMyRecipes, setIds, setItems } from './redux/actions';

function App() {

    const dispatch = useAppDispatch();
    const ids = useAppSelector((state) => state.ids);
    const isAuthenticated = useAppSelector((state) => state.isAuthenticated);

    if (document.cookie) {
        dispatch(setAuthenticate(true));
    };

    const idsHelper = (recipe, ids) => {
        console.log('Ids: ', ids)
        const filtered = ids.filter(id => id.id_tasty !== recipe.id_tasty);
        console.log('Filtered ids: ', filtered)
        return [...filtered, {id: recipe.id, id_tasty: recipe.id_tasty}]
    }

    useEffect(() => {
        (async () => {
        try {
            const recipes = await getMyRecipes()
            recipes.map(el => (dispatch(setIds(idsHelper(el, ids)))))
        } catch (error) {
            console.log(error)
        }})()
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
        <div className="font-oxy-regular">
            <BrowserRouter>
                <Navbar />

                <Routes>
                    {isAuthenticated ?
                    <>
                        <Route exact path="/" element={<RecipesList />}></Route>
                        <Route path="/logout" element={<Logout />}></Route>
                        <Route exact path="/home" element={<RecipesList />}></Route>
                        <Route exact path="/my_recipes" element={<MyRecipesList />}></Route>
                        <Route exact path="/recipes/:id" element={<RecipeDetails />}></Route>
                        <Route exact path="/create" element={<CreateRecipe/>}></Route>
                        <Route exact path="/menu" element={<Menu/>}></Route>
                        <Route exact path="/weekly_menu" element={<WeeklyMenu/>}></Route>
                    </>
                    :
                    <Route path="/*" element={<SignIn />}></Route>}
                </Routes>
            </BrowserRouter>
            <ShoppingList />
        </div>
    );
}


export default App;
