import React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { render, fireEvent } from './utils';
import { RegisterPage } from '../RegisterPage/RegisterPage';
import { userConstants } from '../_constants';
import { configureFakeBackend } from '../_helpers';
import user from './user.json';

describe('register page', () => {
  const mockStore = configureStore([thunk]);
  const store = mockStore({ registration: {} });

  beforeAll(() => {
    configureFakeBackend();
  });

  test('should registered successfully when register given fill out the form correctly', () => {
    const register = jest.fn();
    const { getByTestId } = render(
      <RegisterPage register={register} />,
      { store },
    );
    const {
      firstName, lastName, username, password,
    } = user;
    fireEvent.change(getByTestId('firstName'), { target: { value: firstName } });
    fireEvent.change(getByTestId('lastName'), { target: { value: lastName } });
    fireEvent.change(getByTestId('username'), { target: { value: username } });
    fireEvent.change(getByTestId('password'), { target: { value: password } });

    fireEvent.click(getByTestId('register'));

    const registerAction = store.getActions().filter((action) => action.type === userConstants.REGISTER_REQUEST)[0];
    expect(registerAction.user).toEqual({
      firstName, lastName, username, password,
    });
  });

  test('should show validation message when register given all fields are empty', () => {
    const register = jest.fn();
    const { getByText, getByTestId } = render(
      <RegisterPage register={register} />,
      { store },
    );

    fireEvent.click(getByTestId('register'));

    getByText('First Name is required');
    getByText('Last Name is required');
    getByText('Username is required');
    getByText('Password is required');
  });

  test('should show validation message when register given part of the field are empty', () => {
    const register = jest.fn();
    const { getByText, getByTestId } = render(
      <RegisterPage register={register} />,
      { store },
    );
    const { firstName } = user;
    fireEvent.change(getByTestId('firstName'), { target: { value: firstName } });

    fireEvent.click(getByTestId('register'));

    getByText('Last Name is required');
    getByText('Username is required');
    getByText('Password is required');
  });
});
