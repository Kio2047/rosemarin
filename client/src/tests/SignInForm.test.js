import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom';
import {renderWithProvider} from './renderWithProvider'
import SignInForm from '../components/SignInForm'
import { store } from '../redux/store';
import {Provider} from 'react-redux';



describe('Sign in form', () => {

  test('should have an email address field, a password field, a remember me checkbox and a submit button', () => {
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
  
  test('should allow the user to submit their credentials', async () => {
    const onSubmit = jest.fn(); //no calls made cuz onsubmit is not a prop
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignInForm/>
        </BrowserRouter>
       
      </Provider>
      
  )
    const emailAddressInput = screen.getByPlaceholderText(/Email address/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);
    const submitButton = screen.getByRole('button', { name: /Login/i });
    const email = 'ching@gmail.com'
    const password = '1234'

    fireEvent.change(emailAddressInput, {target: {value: email}});
    fireEvent.change(passwordInput, {target: {value: password}});
    await fireEvent.click(submitButton);

    expect(onSubmit).toHaveBeenCalledWith({email, password})

  })

  test('should set setAuthenticate to true when the user successfully logs in', () => {
    
  })

  test('should redirect the user to /home when logged in', () => {

  })

  test('should redirect the user to register form if no account is found', () => {

  })

})
