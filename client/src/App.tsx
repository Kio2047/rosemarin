import './App.css';
import Navbar from "./components/Navbar";
import RecipesList from "./pages/RecipesList";
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
import Logout from "./pages/Logout";
import SignIn from './pages/SignIn';
import { useAppSelector, useAppDispatch } from './redux/hooks';
import { setAuthenticate } from './redux/actions';

function App() {

    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector((state) => state.isAuthenticated);

    if (document.cookie) {
        dispatch(setAuthenticate(true));
    };

    return (
        <div className="font-oxy-regular">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    {isAuthenticated ?
                    <>
                        <Route path="/" element={<RecipesList />}></Route>
                        <Route path="/logout" element={<Logout />}></Route>
                        <Route path="/home" element={<RecipesList />}></Route>
                        <Route path="/my_recipes" element={<MyRecipesList />}></Route>
                        <Route path="/recipes/:id" element={<RecipeDetails />}></Route>
                        <Route path="/create" element={<CreateRecipe/>}></Route>
                        <Route path="/menu" element={<Menu/>}></Route>
                        <Route path="/weekly_menu" element={<WeeklyMenu/>}></Route>
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