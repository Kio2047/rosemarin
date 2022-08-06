import React from 'react';
import {slide as Menu} from 'react-burger-menu'
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faUser} from "@fortawesome/fontawesome-free-regular";
import {faUserCheck} from "@fortawesome/fontawesome-free-solid";
import { useSelector, useDispatch} from 'react-redux'
import { setHasAccount } from '../redux/actions.tsx';

library.add(faUser);

const Navbar = () => {
    const isAuthenticated = useSelector(state => state.isAuthenticated);

    const dispatch = useDispatch();

    return (
        <div className="relative">
            {isAuthenticated ?
                <div className="flex justify-center items-center h-20 bg-base-100 shadow-md fixed top-0 left-0 right-0 z-10">
                    <div className="">
                        <Link className="menu-item cursor-pointer " to="/my_recipes">My Recipes</Link>
                        <Link className="menu-item ml-10 cursor-pointer" to="/create">Create Recipe</Link>
                    </div>
                    <div className="">
                        <Link to="/home" className="btn btn-ghost normal-case text-3xl font-PoiretOne mr-4 ml-4">ROSEMARY</Link>
                    </div>
                    <div className="justify-start">
                        <label htmlFor="my-modal" className="menu-item mr-10 cursor-pointer modal-button">Shopping List</label>
                        <Link className="menu-item cursor-pointer" to="/menu">Menu</Link>
                    </div>
                    <div className="absolute right-20">
                        <Link className="menu-item cursor-pointer" to="/logout">
                            <FontAwesomeIcon icon={faUserCheck} className="text-2xl cursor-pointer mr-3"/>Logout
                        </Link>
                    </div>
                </div> : 
                <div className="flex justify-center items-center h-20 bg-base-100 shadow-md fixed top-0 left-0 right-0 z-10">
                   <div className="">
                        <span to="/home" className="btn btn-ghost normal-case text-3xl font-PoiretOne mr-4 ml-4">ROSEMARY</span>
                    </div>
                    <div className='absolute right-20'>
                        <Link className="menu-item cursor-pointer" to="/" onClick={() => dispatch(setHasAccount(true))}>
                            <FontAwesomeIcon icon={faUser}className="text-2xl cursor-pointer mr-3"/>Login
                        </Link> 
                    </div>
                </div>
                }
        </div>
    );
};

export default Navbar;