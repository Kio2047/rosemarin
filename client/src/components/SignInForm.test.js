import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom';
import {renderWithProviders} from '../TestsUtils/renderWithProviders'
import SignInForm from './SignInForm'

it('should have an email address field, a password field, a remember me checkbox, a forget your password link, and a submit button', () => {
  renderWithProviders(
    
      <BrowserRouter>
        <SignInForm/>
      </BrowserRouter>
  
   )
  const emailAddress = screen.getByPlaceholderText(/Email address/i);
  const password = screen.getByPlaceholderText(/Password/i);
  const submitButton = screen.getByRole('button', { name: /Login/i });
  const checkbox = screen.getByText(/Remember me/i);
  const forgetPassword = screen.getByText(/Forget your password\?/i);

  expect(emailAddress).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
  expect(checkbox).toBeInTheDocument();
  expect(forgetPassword).toBeInTheDocument();
});

it ('should allow the user to submit their credentials', () => {
  const onSubmitMock = jest.fn();
  renderWithProviders(
   
    <BrowserRouter>
      <SignInForm onSubmitMock={onSubmit}/>
    </BrowserRouter>
)

  const emailAddress = screen.getByPlaceholderText(/Email address/i);
  const password = screen.getByPlaceholderText(/Password/i);
  const submitButton = screen.getByRole('button', { name: /Login/i });;

  userEvent.type(emailAddress, 'ching@gmail.com');
  userEvent.type(password, '1234');
  userEvent.click(submitButton);

  expect(onSubmit).toHaveBeenCalledWith({
    emailAddress: 'ching@gmail.com',
    password: '1234'
  })

})