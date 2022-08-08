import { configureStore } from '@reduxjs/toolkit';

import * as reducers from './reducers';

export const store = configureStore({
  reducer: {
    ...reducers
  },
  preloadedState: {
    isAuthenticated: false,
    hasAccount: true,
    recipes: []
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch