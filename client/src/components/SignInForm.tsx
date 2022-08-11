import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {toggleAuthenticate} from '../redux/actions';

import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { loginFields, signupFields } from "../constants/formFields";
import { login, register } from "../Utils/apiUserService";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import auth from "../Utils/Auth";
import Input from "./Input";
import type { FormField, LoginForm, RegisterForm } from "../types/formTypes";
import { setAuthenticate } from "../redux/actions";

export default function SignInForm() {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const hasAccount = useAppSelector((state) => state.hasAccount);

  type FormStateType = LoginForm | RegisterForm;
  // Why doesn't the below conditional work? Using type union instead in the meantime
  // type FormStateType = hasAccount ? LoginForm : RegisterForm;

  const [formState, setFormState] = useState<FormStateType>({email: "", password: ""});
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Whenever user switches between login and register, update the states for form fields
  //  and reinitialize form values and error message
  useEffect(() => {
    const importedFormFields = hasAccount ? loginFields : signupFields;
    setFormFields(importedFormFields);

    const initialFormState = {email: "", password: ""};
    if (!hasAccount) {
      importedFormFields.forEach((field) => (initialFormState as FormStateType)[field.id] = "");
    }
    setFormState(initialFormState);
    setErrorMessage("");

  }, [hasAccount]);

  const handleChange = function (event: React.FormEvent<HTMLInputElement>) {
    setFormState({
      ...formState,
      // Why do I need to cast to HTMLInputElement below when I already give this as a generic type above
      [(event.target as HTMLInputElement).id]: (event.target as HTMLInputElement).value
    });
  };

  const handleSubmit = function (event: React.FormEvent) {
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
      let response = hasAccount ? await login(formState as LoginForm) : await register(formState as RegisterForm);
      if (!response) {
        hasAccount ? setErrorMessage('Incorrect login information') : setErrorMessage('Account already exists. Please try again');
      }
      else {
        dispatch(setAuthenticate(true));
        auth.login(() => {
          // console.log("cookie status:", document.cookie.match(/^(.*;)?\s*sid\s*=\s*[^;]+(.*)?$/i));
          navigate("/home", { replace: true });
        }
        );
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
    <form  data-cy="sign-in-form" className="mt-8 space-y-6" onSubmit={handleSubmit}>
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