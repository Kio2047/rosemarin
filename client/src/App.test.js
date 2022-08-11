import { render, screen } from '@testing-library/react';
import App from './App';
import { recipeCache } from './data';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const initialState = {ids: [{id: 1234, id_tasty: 1234}], recipes: recipeCache};
const mockStore = configureStore();
let store = mockStore(initialState)

test('renders app', () => {
  render(<Provider store={store}>
    <App/>
  </Provider>);
  
});
