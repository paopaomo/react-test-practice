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

      cy.contains('button', 'Register').click();

      cy.url().should('include', '/login');
      cy.get('#root').contains('Registration successful');
    });
  });

  it('should registered failed when register given all fields are empty', () => {
    cy.contains('button', 'Register').click();

    cy.url().should('include', '/register');
    cy.get('#root').contains('First Name is required');
    cy.get('#root').contains('Last Name is required');
    cy.get('#root').contains('Username is required');
    cy.get('#root').contains('Password is required');
  });

  it('should jump to login page when click Cancel link given stay in register page', () => {
    cy.contains('a', 'Cancel').click();

    cy.url().should('include', '/login');
  });
});
