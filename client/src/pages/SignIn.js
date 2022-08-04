import React, { useState } from "react";
import LoginComponent from "../components/LoginComponent"
import SignupComponent from "../components/SignupComponent";
import Rosemary from '../assets/images/rosemary.png'

export default function Signin ({ setIsAuthenticated, login }) {

    const [hasAccount, setHasAccount] = useState(true);
    const switchHasAccount = function () {
        setHasAccount(!hasAccount);
    };

    return (
        <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">

                <div className="mb-10">
                    <div className="flex justify-center">
                        <img
                            alt=""
                            className="h-14 w-14"
                            src={Rosemary}/>
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        {login ? "Login to your account" : "Sign up to create an account"}
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600 mt-5">
                        {login ? "Don't have an account yet?" : "Already have an account?"} {' '}
                        <button onClick={switchHasAccount} className="font-medium text-purple-600 hover:text-purple-500 cursor-pointer">
                            {login ? "Sign up" : "Log in"}
                        </button>
                    </p>
                </div>

                {hasAccount ? <LoginComponent setIsAuthenticated={setIsAuthenticated}/> : <SignupComponent setIsAuthenticated={setIsAuthenticated}/>}
            </div>
        </div>
    )
};