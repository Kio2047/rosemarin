import {render, screen, fireEvent} from '@testing-library/react';
import Heart from '../components/Heart';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('heart component tests', () => {
  const initialState = {ids: [{id: 1234, id_tasty: 1234}]};
  const mockStore = configureStore();
  let store = mockStore(initialState)

  it('should render', () => {
    render(
    <Provider store={store}>
      <Heart recipe={{id: 100}}/>
    </Provider>
    )
  })

})