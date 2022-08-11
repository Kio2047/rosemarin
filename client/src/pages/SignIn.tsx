import React from "react";

import { useAppSelector, useAppDispatch } from "../redux/hooks";
import Rosemary from '../assets/images/rosemary.png'
import SignInForm from "../components/SignInForm";
import { toggleHasAccount } from "../redux/actions";
// import { useNavigate } from 'react-router-dom';


export default function SignIn () {

    // const navigate = useNavigate();

    // if (document.cookie) {
    //     navigate("../home", { replace: true });
    // }

    const dispatch = useAppDispatch();
    const hasAccount = useAppSelector((state) => state.hasAccount);

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
                        {hasAccount ? "Login to your account" : "Sign up to create an account"}
                    </h2>
                    <p className="text-center text-sm text-gray-600 mt-5">
                        {hasAccount ? "Don't have an account yet?" : "Already have an account?"} {' '}
                        <button data-cy="toggle-sign-in-form" onClick={() => dispatch(toggleHasAccount())} className="font-medium text-purple-600 hover:text-purple-500 cursor-pointer">
                            {hasAccount ? "Sign up" : "Log in"}
                        </button>
                    </p>
                </div>
                <SignInForm ></SignInForm>
            </div>
        </div>
    )
};