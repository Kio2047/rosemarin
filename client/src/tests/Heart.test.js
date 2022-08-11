import {render, screen, fireEvent} from '@testing-library/react';
import Heart from '../components/Heart';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { recipeCache } from '../data'
import userEvent from '@testing-library/user-event'
import * as apiDBRecipeService from '../Utils/apiDBRecipeService'

describe('heart component tests', () => {

  const initialState = {ids: [{id: 1234, id_tasty: 1234}], recipes: recipeCache};
  const mockStore = configureStore();
  let store = mockStore(initialState)
  
  //Needed to mock api calls when clicking on heart icon. 
  //Otherwise network error
  const mockPostRecipe = jest.spyOn(apiDBRecipeService, 'postRecipe');
  mockPostRecipe.mockResolvedValue({status: 200});

  const mockDeleteRecipe = jest.spyOn(apiDBRecipeService, 'deleteRecipe');
  mockDeleteRecipe.mockResolvedValue({status: 200})

  
  it('should render heart icon', () => {
    render(
      <Provider store={store}>
        <Heart recipe={{id: 100}}/>
      </Provider>
    )
    expect(screen.getByRole('img', {hidden: true})).toBeVisible();
  })

  it('should render gray heart if not already a favorite', () => {
    render(<Provider store={store}>
      <Heart recipe={recipeCache[0]}/>
    </Provider>)
    const heart = screen.getByRole('img', {hidden: true})
    expect(heart).toHaveClass('link-secondary')
  })

  it('shouldn\'t display modal if not clicked', async () => {
    render(
      <Provider store={store}>
        <Heart recipe={recipeCache[0]}/>
      </Provider>
    )
    const heart = screen.getByRole('img', {hidden: true})
    expect(heart).toHaveClass('link-secondary')
    const keepBtn = screen.queryByText(/keep/i, {hidden: true})
    const removeBtn = screen.queryByText(/remove/i, {hidden: true})
    expect(keepBtn).toBeNull()
    expect(removeBtn).toBeNull()

  })

  it('should turn red when clicked and not faved already', async () => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <Heart recipe={recipeCache[0]}/>
      </Provider>
    )
    const heart = screen.getByRole('img', {hidden: true})
    await user.click(heart)
    expect(heart).toHaveClass('link')
  })

  it('modal should show upon click', async () => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <Heart recipe={recipeCache[0]}/>
      </Provider>
    )
    const heart = screen.getByRole('img', {hidden: true});
    await user.dblClick(heart)
    const keepBtn = screen.getByText(/keep/i, {hidden: true})
    const removeBtn = screen.getByText(/remove/i, {hidden: true})

    expect(keepBtn).toBeVisible()
    expect(removeBtn).toBeVisible()
  })

  it('should remove recipe after click \'remove\'', async () => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <Heart recipe={recipeCache[0]}/>
      </Provider>
    )
    const heart = screen.getByRole('img', {hidden: true});
    await user.dblClick(heart)
    const keepBtn = screen.getByText(/keep/i, {hidden: true})
    const removeBtn = screen.getByText(/remove/i, {hidden: true})
    await user.click(removeBtn);

    expect(keepBtn).not.toBeVisible();
    expect(removeBtn).not.toBeVisible();
    expect(heart).toHaveClass('link-secondary')
  })

  it('should keep recipe faved after click \'keep\'', async () => {
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <Heart recipe={recipeCache[0]}/>
      </Provider>
    )
    const heart = screen.getByRole('img', {hidden: true});
    await user.dblClick(heart)

    const keepBtn = screen.getByText(/keep/i, {hidden: true})
    const removeBtn = screen.getByText(/remove/i, {hidden: true})
    await user.click(keepBtn);

    expect(keepBtn).not.toBeVisible();
    expect(removeBtn).not.toBeVisible();
    expect(heart).toHaveClass('link');
      
  })

})