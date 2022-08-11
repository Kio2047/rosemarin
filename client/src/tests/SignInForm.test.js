// import { render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
// import { BrowserRouter } from 'react-router-dom';
// import {renderWithProvider} from './testUtils/renderWithProvider'
// import SignInForm from '../components/SignInForm'
// import { store } from '../redux/store';
// import {Provider} from 'react-redux';



// describe('Sign in form', () => {

//   test('should have an email address field, a password field, a remember me checkbox, a forget your password link, and a submit button', () => {
//     render(
//         <Provider store={store}>
//           <BrowserRouter>
//             <SignInForm/>
//           </BrowserRouter>
//         </Provider>

//     )

//     const emailAddress = screen.getByPlaceholderText(/Email address/i);
//     const password = screen.getByPlaceholderText(/Password/i);
//     const submitButton = screen.getByRole('button', { name: /Login/i });
//     const checkbox = screen.getByText(/Remember me/i);


//     expect(emailAddress).toBeInTheDocument();
//     expect(password).toBeInTheDocument();
//     expect(submitButton).toBeInTheDocument();
//     expect(checkbox).toBeInTheDocument();

//   });

//   test('should allow the user to submit their credentials', () => {

//     render(
//     <Provider store={store}>
//       <BrowserRouter>
//         <SignInForm/>
//       </BrowserRouter>

//     </Provider>
//   )

//     const emailAddress = screen.getByPlaceholderText(/Email address/i);
//     const password = screen.getByPlaceholderText(/Password/i);
//     const submitButton = screen.getByRole('button', { name: /Login/i });;

//     userEvent.type(emailAddress, 'ching@gmail.com');
//     userEvent.type(password, '1234');
//     userEvent.click(submitButton);

//     expect(onSubmit).toHaveBeenCalledWith({
//       emailAddress: 'ching@gmail.com',
//       password: '1234'
//     })

//   })

// })
