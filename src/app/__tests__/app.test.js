import React from 'react';
import { render } from '@testing-library/react';

import App from '../app';

describe('App', () => {
  test('should render App component', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('app').textContent).toBe('Hello World');
  });
});
