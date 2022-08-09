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
    // const [ids, setIds] = useState([])
    const ids = useAppSelector((state) => state.ids);

    // const [items, setItems] = useState([]);

    useEffect(() => {
      (async () => {
          const data = await getMyShoppingList()
        //   console.log("THE DATA IS:", data);
          dispatch(setItems(data));
      })();
    }, [])

    useEffect(() => {
        (async () => {
            if (document.cookie) {
                dispatch(setAuthenticate(true));
            }
            const data = await getRandomRecipe()
            // console.log('List of random recipes: ', data.results)
            dispatch(setRecipes(data.results))
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

            /*     if (document.cookie) {
                   dispatch(toggleAuthenticate())
                } */
                console.log('Am i being called? ', recipes)
                dispatch(setMyRecipes(recipes || []));
            })
            .catch(err => console.log.bind(err))
    }, [ids])

    // console.log("here kio kio:", ids);
    return (
        <div className="font-oxy-regular">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route exact path="/" element={<SignIn />}></Route>
                    <Route
                        path="/logout"
                        element={<Logout />}
                    />

                    <Route exact path="/home"
                           element={<RecipesList />}></Route>
                    <Route exact path="/my_recipes"
                           element={<MyRecipesList />}></Route>
                    <Route exact path="/recipes/:id" element={<RecipeDetails />}></Route>
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
