import React from 'react';
import {Link, To} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

import { useAppDispatch } from '../redux/hooks';
import {toggleAuthenticate} from '../redux/actions';
import { logout } from '../Utils/apiUserService';
import auth from "../Utils/Auth";

const Logout = () => {

    let navigate = useNavigate();
    const dispatch = useAppDispatch();

/*     const handleClick = () => {
        console.log('penne2')
        apiUserService.logout()
            .then(res => console.log(res))
            .catch(err => console.log(err));
        handleLogout();
    };
 */

  const handleLogout = (shouldLogout: Boolean) => {
    if (shouldLogout) {
      (async() => {
        try {

          const data = await logout()
          console.log("here's the response:", data)
        } catch (error) {
          console.log(error)
        } 
      })();
      dispatch(toggleAuthenticate());
      auth.logout(() => navigate("../", {replace: true}));
    } else {
      navigate(-1 as To, {replace: true})
    }
    
  };


    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h2 className="text-2xl font-bold">Are you sure you want to log out?</h2>
                    <Link to="/">
                        <button className="group relative w-full  py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-10 w-[150px] mr-10" onClick={() => handleLogout(true)}>Yes</button>
                    </Link>
                    <button onClick={() => handleLogout(false)} className="group relative w-full  py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-10 w-[150px]">
                        No
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Logout;