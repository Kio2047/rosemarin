// modify this once after finding out what recipe properties are actually being used
export type recipe = any

export type state = {
  isAuthenticated: Boolean,
  hasAccount: Boolean,
  recipes: recipe[]
}