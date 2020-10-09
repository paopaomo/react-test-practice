import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';

const customRender = (component, { store = configureStore(), ...restOptions }) => {
  const wrapper = ({ children }) => <Provider store={store}><BrowserRouter>{children}</BrowserRouter></Provider>;

  return render(component, { wrapper, ...restOptions });
};

export * from '@testing-library/react';

export { customRender as render };
