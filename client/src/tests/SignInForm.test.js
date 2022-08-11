import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom';
import {renderWithProvider} from './renderWithProvider'
import SignInForm from '../components/SignInForm'
import { store } from '../redux/store';
import {Provider} from 'react-redux';



describe('Sign in form', () => {

  test('should have an email address field, a password field, a remember me checkbox, a forget your password link, and a submit button', () => {
    render(
        <Provider store={store}>
          <BrowserRouter>
            <SignInForm/>
          </BrowserRouter>
         
        </Provider>
        
    )
     
    const emailAddress = screen.getByPlaceholderText(/Email address/i);
    const password = screen.getByPlaceholderText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Login/i });
    const checkbox = screen.getByText(/Remember me/i);
   
  
    expect(emailAddress).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();

  });
  
  test('should allow the user to submit their credentials', () => {
    //check the output/ui changes after clicking submit 
    const onSubmit = jest.fn();
    const emailAddress = screen.getByPlaceholderText(/Email address/i);
    const password = screen.getByPlaceholderText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Login/i });

    fireEvent.change(emailAddress, {target: {value: emailAddress}});
    fireEvent.change(password, {target: {value: password}});
    fireEvent.click(submitButton);

    expect(onSubmit).toHaveBeenCalledWith(emailAddress, password)

  })

  // test("should submit the form with username, password, and remember", async () => {
  //   const onSubmit = jest.fn();
  //   const { findByTestId } = renderLoginForm({
  //     onSubmit,
  //     shouldRemember: false
  //   });
  //   const username = await findByTestId("username");
  //   const password = await findByTestId("password");
  //   const remember = await findByTestId("remember");
  //   const submit = await findByTestId("submit");

  //   fireEvent.change(username, { target: { value: "test" } });
  //   fireEvent.change(password, { target: { value: "password" } });
  //   fireEvent.click(remember);
  //   fireEvent.click(submit);

  //   expect(onSubmit).toHaveBeenCalledWith("test", "password", true);
  // });

  test('should set setAuthenticate to true when the user successfully logs in', () => {
    
  })

  test('should redirect the user to /home when logged in', () => {

  })

  test('should redirect the user to register form if no account is found', () => {

  })

})
