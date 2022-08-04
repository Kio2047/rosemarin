import React, { useState } from "react";
import Header from "../components/Header";
import LoginComponent from "../components/LoginComponent"
import SignupComponent from "../components/SignupComponent";

export default function Signin ({ setIsAuthenticated, login }) {

    const [hasAccount, setHasAccount] = useState(true);
    const switchHasAccount = function () {
        setHasAccount(!hasAccount);
    }

    return (
        <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <Header
                    heading = {login ? "Login to your account" : "Sign up to create an account"}
                    paragraph= {login ? "Don't have an account yet?" : "Already have an account?"}
                    linkName= {login ? "Sign up" : "Log in"}
                    switchHasAccount= {switchHasAccount}
                />
                {hasAccount ? <LoginComponent setIsAuthenticated={setIsAuthenticated}/> : <SignupComponent setIsAuthenticated={setIsAuthenticated}/>}
            </div>
        </div>
    )
}