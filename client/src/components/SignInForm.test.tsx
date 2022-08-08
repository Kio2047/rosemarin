import SignInForm  from './SignInForm'
import {render, fireEvent} from '@testing-library/react';
import ReactDOM from 'react-dom';
import {createRoot} from 'react-dom/client'

it('should render sign in form', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(<SignInForm hasAccount={undefined} />)
});

