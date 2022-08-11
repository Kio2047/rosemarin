import {render, screen, fireEvent} from '@testing-library/react';
import Logout from '../pages/Logout'
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { BrowserRouter } from 'react-router-dom';
import RecipesList from '../pages/RecipesList';



const handleLogout = jest.fn()


describe('Logout', () => {

  it('should render logout page', () => {
    render(
    <Provider store={store}>
      <BrowserRouter>
      <Logout/>
      </BrowserRouter>
      
    </Provider>
    )

    const yesButton = screen.getByRole('button', { name: /Yes/i });
    const noButton = screen.getByRole('button', { name: /No/i });

    expect(yesButton).toBeInTheDocument();
    expect(noButton).toBeInTheDocument();
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
        <Logout/>
        </BrowserRouter>

      </Provider>
    )
    
    const logOutButton = screen.getByText('Yes');

    fireEvent.click(logOutButton);

    expect(handleLogout).toHaveBeenCalled();
    



  })

})