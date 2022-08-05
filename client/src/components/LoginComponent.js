import { useState } from 'react';
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import { useNavigate } from 'react-router-dom';
import apiUserService from "../Utils/apiUserService";
import auth from "../Utils/Auth";

const fields=loginFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

function LoginComponent({ setIsAuthenticated }){
    const [loginState,setLoginState]=useState(fieldsState);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        authenticateUser();
    }

    //Handle Login API Integration here
    const authenticateUser = async function () {
        try {
            const response = await apiUserService.login(loginState);
            if (response) {
                setErrorMessage('Incorrect login information.')
            }
            else {
                // This sets isAuthenticated = true and redirects to profile
                setIsAuthenticated(true);
                auth.login(() => navigate("../home", { replace: true }));
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const validateForm = () => {
        return !loginState.email || !loginState.password;
    };

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
                {
                    fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                        />

                    )
                }
            </div>

            <FormExtra/>
            <FormAction handleSubmit={handleSubmit} text="Login" validateForm={validateForm}/>
            <div className="alert-error">{errorMessage}</div>
        </form>
    )
}

export default LoginComponent;