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
import { toggleAuthenticate, setAuthenticate } from './redux/actions.tsx';
import { setRecipes } from './redux/actions.tsx'

function App() {

    const dispatch = useDispatch();
    const [myRecipes, setMyRecipes] = useState([]);
    const [ids, setIds] = useState([])
    const [items, setItems] = useState([]);

    useEffect(() => {
      (async () => {
          const data = await getMyShoppingList()
          setItems(data)
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
            .then(recipes => recipes.map(el => setIds(prev => {

                let id = el.id;
                let id_tasty = el.id_tasty;
                const filtered = prev.filter(e => e.id_tasty !== el.id_tasty);
                return [...filtered, {id, id_tasty}]
            })))
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
                setMyRecipes(recipes)
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
                           element={<RecipesList setIds={setIds}ids={ids}/>}></Route>
                    <Route exact path="/my_recipes"
                           element={<MyRecipesList myRecipes={myRecipes} setMyRecipes={setMyRecipes} setIds={setIds}
                                                   ids={ids}/>}></Route>
                    <Route exact path="/recipes/:id" element={<RecipeDetails myRecipes={myRecipes} setItems={setItems} setIds={setIds} ids={ids}/>}></Route>
                    <Route exact path="/create" element={<CreateRecipe/>}></Route>
                    <Route exact path="/menu" element={<Menu/>}></Route>
                    <Route exact path="/weekly_menu" element={<WeeklyMenu/>}></Route>
                </Routes>
            </BrowserRouter>
            <ShoppingList items={items} setItems={setItems}/>
        </div>
    );
}


export default App;
