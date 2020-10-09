describe('register', () => {
  beforeEach(() => {
    cy.visit('/register');
  });

  it('should registered successfully when register given fill out the form correctly', () => {
    cy.fixture('user').then((user) => {
      const {
        firstName, lastName, username, password,
      } = user;
      cy.get('input[name=firstName]').type(firstName);
      cy.get('input[name=lastName]').type(lastName);
      cy.get('input[name=username]').type(username);
      cy.get('input[name=password]').type(password);

      cy.get('[data-testid="register"]').click();

      cy.url().should('include', '/login');
      cy.get('[data-testid="alert"]').contains('Registration successful');
    });
  });

  it('should registered failed when register given all fields are empty', () => {
    cy.get('[data-testid="register"]').click();

    cy.get('[data-testid="form"]').contains('First Name is required');
    cy.get('[data-testid="form"]').contains('Last Name is required');
    cy.get('[data-testid="form"]').contains('Username is required');
    cy.get('[data-testid="form"]').contains('Password is required');
  });

  it('should registered failed when register given part of the field are empty', () => {
    cy.get('input[name=firstName]').type('firstName');

    cy.get('[data-testid="register"]').click();

    cy.get('[data-testid="form"]').contains('Last Name is required');
    cy.get('[data-testid="form"]').contains('Username is required');
    cy.get('[data-testid="form"]').contains('Password is required');
  });

  it('should jump to login page when click Cancel link given stay in register page', () => {
    cy.get('[data-testid="cancel"]').click();

    cy.url().should('include', '/login');
  });
});
