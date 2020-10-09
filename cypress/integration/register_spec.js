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

  it('should jump to login page when click Cancel link given stay in register page', () => {
    cy.get('[data-testid="cancel"]').click();

    cy.url().should('include', '/login');
  });
});
