import { configureFakeBackend } from '../../src/app/_helpers';

describe('login', () => {
  before(() => {
    configureFakeBackend();
    cy.fixture('user')
      .then((user) => fetch('/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      }));
  });

  beforeEach(() => {
    cy.fixture('user').as('user');
    cy.visit('/login');
  });

  it('should login successfully when login given a registered account', () => {
    cy.get('@user').then((user) => {
      const { username, password, firstName } = user;
      cy.get('input[name=username]').type(username);
      cy.get('input[name=password]').type(password);

      cy.contains('button', 'Login').click();

      cy.url().should('include', '/');
      cy.get('#root').contains(`Hi ${firstName}!`);
    });
  });

  it('should login failed when login given an unregistered account', () => {
    cy.get('input[name=username]').type('unregistered account');
    cy.get('input[name=password]').type('123456');

    cy.contains('button', 'Login').click();

    cy.url().should('include', '/login');
    cy.get('#root').contains('Username or password is incorrect');
  });

  it('should login failed when login given a registered account with error password', () => {
    cy.get('@user').then((user) => {
      const { username } = user;
      cy.get('input[name=username]').type(username);
      cy.get('input[name=password]').type('234567');

      cy.contains('button', 'Login').click();

      cy.url().should('include', '/login');
      cy.get('#root').contains('Username or password is incorrect');
    });
  });

  it('should jump to register page when click register link given stay in login page', () => {
    cy.contains('a', 'Register').click();

    cy.url().should('include', '/register');
  });
});
