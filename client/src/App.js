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
import { getMyShoppingList } from "./Utils/apiDBServiceShoppingList";
import Logout from "./pages/Logout";
import Signin from './pages/SignIn';
import { useSelector, useDispatch } from 'react-redux'
import { toggleAuthenticate, setAuthenticate } from './redux/actions.js';
import { 
    setRecipes, 
    setMyRecipes, 
    setIds,
    setItems } from './redux/actions.js'



function App() {

    const dispatch = useDispatch();
    const ids = useSelector(state => state.ids);
    
    

    useEffect(() => {
      (async () => {
          const data = await getMyShoppingList()
          dispatch(setItems(data))
      })();   
    }, [])

    useEffect(() => {
        (async () => {
            const data = await getRandomRecipe()
            console.log('List of random recipes: ', data.results)
            dispatch(setRecipes(data.results))
            if (document.cookie) {
                setAuthenticate(true);
            }
        })();
    }, []);


    useEffect(() => {
        getMyRecipes()
            .then(recipes => recipes.map(el => dispatch(setIds(prev => {

                let id = el.id;
                let id_tasty = el.id_tasty;
                const filtered = prev.filter(e => e.id_tasty !== el.id_tasty);
                return [...filtered, {id, id_tasty}]
            }))))
            .catch(err => console.log.bind(err))
    }, []);

    useEffect(() => {
        getMyRecipes()
            // .then(recipes => console.log(recipes))
            .then(recipes => {

            //THIS WAS CAUSING THE ISSUE: 
            //everytime ids change, toggleAuthenticate was called if the cookie was active

            /*     if (document.cookie) {
                   dispatch(toggleAuthenticate())
                } */
                console.log('Am i being called? ', recipes)
                dispatch(setMyRecipes(recipes))
            })
            .catch(err => console.log.bind(err))
    }, [ids])


    return (
        <div className="font-oxy-regular">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<Signin />}></Route>
                    <Route
                        path="/logout"
                        element={<Logout />}
                    />

                    <Route exact path="/home"
                           element={<RecipesList />}></Route>
                    <Route exact path="/my_recipes"
                           element={<MyRecipesList />}></Route>
                    <Route exact path="/recipes/:id" element={<RecipeDetails  />}></Route>
                    <Route exact path="/create" element={<CreateRecipe/>}></Route>
                    <Route exact path="/menu" element={<Menu/>}></Route>
                    <Route exact path="/weekly_menu" element={<WeeklyMenu/>}></Route>
                </Routes>
            </BrowserRouter>
            <ShoppingList />
        </div>
    );
}


export default App;
