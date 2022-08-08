export type FormField = {
  labelText: string,
  labelFor: string,
  id: string,
  name: string,
  type: string,
  autoComplete: string,
  isRequired: boolean,
  placeholder: string
};

export type LoginForm = {
  [key: string]: string,
  email: string,
  password: string
}

export type RegisterForm = {
  [key: string]: string,
  name: string,
  email: string,
  password: string,
  "confirm-password": string
}