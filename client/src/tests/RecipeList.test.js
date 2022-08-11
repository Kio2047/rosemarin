import React from 'react';
import configureStore from 'redux-mock-store';
import { recipeCache } from '../data';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import RecipesList from '../pages/RecipesList';
import { BrowserRouter } from 'react-router-dom';


describe('recipe list component tests', () => {

  const ids = [{id: 0, id_tasty: 8374}, {id: 0, id_tasty: 8398}]
  const slicedRecipeCache = recipeCache.slice(0, 20)
  const initialState = {recipes: slicedRecipeCache, ids, isAuthenticated: true, hasAccount: true }
  const mockStore = configureStore();
  let store = mockStore(initialState)


  it('should render top section', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RecipesList/>
        </BrowserRouter>
      </Provider>
    )
    const heading = screen.getByRole('heading', {hidden: true, name: 'Cooking is a love you can taste...'})
    expect(heading).toBeInTheDocument();
    expect(heading).toBeVisible();
  })

  it('should render search button', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RecipesList/>
        </BrowserRouter>
      </Provider>
    )
    const searchButton = screen.getByRole('button', {hidden: true, name: /search/i});
    expect(searchButton).toBeInTheDocument();
    expect(searchButton).toBeVisible();
  })


  it('should render the list of recipes', async () => {
    render(
    <Provider store={store}>
      <BrowserRouter>
        <RecipesList/>
      </BrowserRouter>
    </Provider>
    )
    const recipeList = screen.getAllByRole('listitem', {hidden: true});
    expect(recipeList).toHaveLength(20);
    recipeList.forEach(recipe => {
      expect(recipe).toBeInTheDocument()
      expect(recipe).toBeVisible()
    })
  })

  it('should show red hearts if recipes\' id are in ids', () => {
    const {container} = render(
      <Provider store={store}>
        <BrowserRouter>
          <RecipesList/>
        </BrowserRouter>
      </Provider>
    )
    // const hearts = screen.getAllByRole('img', {hidden: true})
    const redHearts = container.getElementsByClassName('link');
    [...redHearts].forEach(redHeart => {
      expect(redHeart).toBeInTheDocument();
      expect(redHeart).toBeVisible();
    })
  })

  it('should display a deatails button for each recipe', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <RecipesList/>
        </BrowserRouter>
      </Provider>
    ) 
    const detailsButtons = screen.getAllByRole('link', {name: /details/i, hidden: true});
    expect(detailsButtons).toHaveLength(slicedRecipeCache.length);
  })
})