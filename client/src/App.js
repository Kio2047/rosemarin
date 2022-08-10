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
import SignIn from './pages/SignIn';
import { useAppSelector, useAppDispatch } from './redux/hooks';
import { toggleAuthenticate, setAuthenticate, setRecipes, setMyRecipes, setIds, setItems } from './redux/actions';

function App() {

    const dispatch = useAppDispatch();
    const ids = useAppSelector((state) => state.ids);
    const isAuthenticated = useAppSelector((state) => state.isAuthenticated);

    if (document.cookie) {
        dispatch(setAuthenticate(true));
    };

    useEffect(() => {
      (async () => {
          const data = await getMyShoppingList()
          dispatch(setItems(data));
      })();
    }, [])

    useEffect(() => {
        (async () => {
            const data = await getRandomRecipe();
            const filteredData = data.results.filter((recipe) => !recipe["video_url"]);
            console.log("random recipes:", filteredData);
            dispatch(setRecipes(filteredData));
        })();
    }, []);

    const idsHelper = (el, ids) => {
        let id = el.id;
        let id_tasty = el.id_tasty;
        const filtered = ids.filter(e => e.id.tasty !== el.id_tasty);
        return [...filtered, {id, id_tasty}]
    }

    useEffect(() => {
        getMyRecipes()
            .then(recipes => recipes.map(el => (dispatch(setIds(idsHelper(el, ids))))))
            .catch(err => console.log.bind(err))
    }, []);

    useEffect(() => {
        getMyRecipes()
            // .then(recipes => console.log(recipes))
            .then(recipes => {

            //THIS WAS CAUSING THE ISSUE:
            //everytime ids change, toggleAuthenticate was called if the cookie was active

                console.log('Am i being called? ', recipes)
                dispatch(setMyRecipes(recipes || []));
            })
            .catch(err => console.log.bind(err))
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
