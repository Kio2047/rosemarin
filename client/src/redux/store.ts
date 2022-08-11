import { configureStore } from '@reduxjs/toolkit';

import * as reducers from './reducers';

export const store = configureStore({
  reducer: {
    ...reducers
  },
  preloadedState: {
    isAuthenticated: false,
    hasAccount: true,
    recipes: [],
    myRecipes: [],
    ids: [],
    items: []
  }
});

export const setupTestStore = function(preloadedState: RootState) {
  return configureStore({
    reducer: {
      ...reducers
    },
    preloadedState
  });
};

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch