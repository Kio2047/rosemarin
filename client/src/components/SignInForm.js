import { loginFields, signupFields } from "../constants/formFields";
import { useState, useEffect, useNavigate } from "react";

export default function SignInForm({ setIsAuthenticated, hasAccount }) {

  useEffect(() => {
    const fields = hasAccount ? loginFields : signupFields;
    const initialFormState = {};
    fields.forEach((field) => initialFormState[field.id] = "");
    const [formState, setFormState] = useState({...initialFormState});
    const [errorMessage, setErrorMessage] = useState('');
  }, [hasAccount]);

  // this should also be fine without the spread - check

  const navigate = useNavigate();

  const handleChange= function(event) {
    setFormState({
      ...formState,
      [e.target.id]:e.target.value
    });
  };

  const handleSubmit=(e)=>{
    e.preventDefault();
    checkCredentials();
  }

  //Handle Login / Register API Integration here
  const checkCredentials = async function () {
    try {
      let response = hasAccount ? await apiUserService.login(formState) : await apiUserService.register(formState);
      // Temporary line to make login and register login consistent - to remove after modifying response returned by login API
      response = hasAccount ? !Boolean(response) : response

      if (!response) {
        hasAccount ? setErrorMessage('Incorrect login information.') : setErrorMessage('Account already exists. Please try again.');
      }
      else {
        // This sets isAuthenticated = true and redirects to profile
        setIsAuthenticated(true);
        auth.login(() => navigate("../home", { replace: true }));
      };
    }
    catch (error) {
      console.log(error);
    }
  }

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
                fields.map(field=>
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