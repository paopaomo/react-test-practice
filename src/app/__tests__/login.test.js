import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { render, fireEvent } from './utils';
import { configureFakeBackend } from '../_helpers';
import user from './user.json';
import { LoginPage } from '../LoginPage';
import { userConstants } from '../_constants';

describe('login page', () => {
  const mockStore = configureStore([thunk]);
  const store = mockStore({ authentication: {} });

  beforeAll(() => {
    configureFakeBackend();
    fetch('/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
  });

  test('should login successfully when login given a registered account', () => {
    const login = jest.fn();
    const { getByTestId } = render(<LoginPage login={login} />, { store });
    const { username, password } = user;
    fireEvent.change(getByTestId('username'), { target: { value: username } });
    fireEvent.change(getByTestId('password'), { target: { value: password } });

    fireEvent.click(getByTestId('login'));

    const loginAction = store.getActions().filter((action) => action.type === userConstants.LOGIN_REQUEST)[0];
    expect(loginAction.user).toEqual({ username });
  });

  test('should show validation message when login given all fields are empty', () => {
    const login = jest.fn();
    const { getByTestId, getByText } = render(<LoginPage login={login} />, { store });

    fireEvent.click(getByTestId('login'));

    getByText('Username is required');
    getByText('Password is required');
  });

  test('should show validation message when login given part of the field are empty', () => {
    const login = jest.fn();
    const { getByTestId, getByText, queryAllByText } = render(<LoginPage login={login} />, { store });
    const { username } = user;
    fireEvent.change(getByTestId('username'), { target: { value: username } });

    fireEvent.click(getByTestId('login'));

    expect(queryAllByText(/Username is required/)).toEqual([]);
    getByText('Password is required');
  });
});
