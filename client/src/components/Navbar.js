import React from 'react';
import {slide as Menu} from 'react-burger-menu'
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faUser} from "@fortawesome/fontawesome-free-regular";
import {faUserCheck} from "@fortawesome/fontawesome-free-solid";

library.add(faUser);

const Navbar = ({isAuthenticated, setHasAccount}) => {

    return (
        <div className="relative">
            <div
                className="flex justify-center items-center h-20 bg-base-100 shadow-md fixed top-0 left-0 right-0 z-10">
                    {
                        isAuthenticated &&
                    <div className="">
                            <Link className="menu-item cursor-pointer " to="/my_recipes">My Recipes</Link>
                            <Link className="menu-item ml-10 cursor-pointer" to="/create">Create Recipe</Link>
                    </div>
                    }
                <div className="">
                    {
                        isAuthenticated ?
                            <Link to="/home" className="btn btn-ghost normal-case text-3xl font-PoiretOne mr-4 ml-4">ROSEMARY</Link> :
                            <span className="btn btn-ghost normal-case text-3xl font-PoiretOne mr-4 ml-4">ROSEMARY</span>
                    }
                </div>
                <div className="justify-start">
                    {
                        isAuthenticated &&
                            <label htmlFor="my-modal" className="menu-item mr-10 cursor-pointer modal-button">Shopping
                                List</label>
                    }
                    {
                        isAuthenticated &&
                            <Link className="menu-item cursor-pointer" to="/menu">Menu</Link>
                    }
                </div>
                <div className="absolute right-20">
                    {
                        isAuthenticated ?
                            <Link className="menu-item cursor-pointer" to="/logout">
                                <FontAwesomeIcon icon={faUserCheck} className="text-2xl cursor-pointer mr-3"/>Logout
                            </Link> : 
                            <Link className="menu-item cursor-pointer" to="/" onClick={() => setHasAccount((prev) => true)}><FontAwesomeIcon icon={faUser}
                            className="text-2xl cursor-pointer mr-3"/>
                                Login</Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;