import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {toggleAuthenticate} from '../redux/actions.tsx';

import { loginFields, signupFields } from "../constants/formFields";
import apiUserService from "../Utils/apiUserService";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import auth from "../Utils/Auth";
import Input from "./Input";

export default function SignInForm({ hasAccount }) {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formState, setFormState] = useState({});
  const [formFields, setFormFields] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Whenever user switches between login and register, update the states for form fields
  //  and reinitialize form values and error message
  useEffect(() => {
    const importedFormFields = hasAccount ? loginFields : signupFields
    setFormFields(importedFormFields);

    const initialFormState = {};
    importedFormFields.forEach((field) => initialFormState[field.id] = "");
    setFormState(initialFormState);

    setErrorMessage("");

  }, [hasAccount]);

  const handleChange = function(event) {
    setFormState({
      ...formState,
      [event.target.id]: event.target.value
    });
  };

  const handleSubmit = function (event) {
    event.preventDefault();
    if (!hasAccount && formState.password !== formState["confirm-password"]) {
      setErrorMessage("Passwords don't match");
      return;
    }
    checkCredentials();
  }

  // Handle login / registration
  const checkCredentials = async function () {
    try {
      let response = hasAccount ? await apiUserService.login(formState) : await apiUserService.register(formState);
      if (!response) {
        hasAccount ? setErrorMessage('Incorrect login information.') : setErrorMessage('Account already exists. Please try again.');
      }
      else {
        dispatch(toggleAuthenticate())
        auth.login(() => navigate("../home", { replace: true }));
      };
    }
    catch (error) {
      console.log(error);
    }
  }

  // Form is only valid if all fields are populated
  const validateForm = () => {
    for (let formField in formState) {
      if (!formState[formField]) return false;
    }
    return true;
  };

  return(
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="">
            {
                formFields.map((field)=>
                    <Input
                        key={field.id}
                        handleChange={handleChange}
                        value={formState[field.id]}
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
        {hasAccount && <FormExtra/>}
        <FormAction handleSubmit={handleSubmit} text={hasAccount ? "Login" : "Sign up"} validateForm={validateForm}/>
        <div className="alert-error">{errorMessage}</div>
    </form>
  )
};