import {render, screen, fireEvent} from '@testing-library/react';
import Logout from '../pages/Logout'
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { BrowserRouter } from 'react-router-dom';
import RecipesList from '../pages/RecipesList';
import SignIn from '../pages/SignIn';

describe('Logout', () => {

  it('should render logout page', () => {
    render(
    <Provider store={store}>
      <BrowserRouter>
      <Logout/>
      </BrowserRouter>
      
    </Provider>
    )
  })

  it('should redirect the user to /home when they click no', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
        <RecipesList/>
        </BrowserRouter>
 
      </Provider>
    )
  })

  it('should log out the user when they click yes', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
        <SignIn/>
        </BrowserRouter>

      </Provider>
    )

  })

})