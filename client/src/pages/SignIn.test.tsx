import { render, screen } from '@testing-library/react';
import SignIn from './SignIn';

describe('Sign in page', () => {
  test('should match the snapshot', () => {
    const { container } = render(<SignIn />);
    expect(container).toMatchSnapshot();
  })
})