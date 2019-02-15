describe('Signin', () => {
  beforeEach(() => {
    cy.exec('npm run db:clean');
  });

  it('should sign in an existing user', () => {
    cy.createUser().then(user => {
      cy.visit('/')
        .getByTestId('signin-button')
        .click()
        .getByLabelText(/email/i)
        .type(user.email)
        .getByLabelText(/password/i)
        .type(user.password)
        .getByTestId('submit')
        .click()
        .assertHome()
        .getByTestId('signout-button')
        .should('have.text', 'Sign out');
    });
  });

  it('should display an error if sign in failed', () => {
    cy.server();
    cy.route({
      method: 'POST',
      url: 'http://localhost:8080/signin',
      status: '500',
      response: {}
    });
    cy.visit('/signin')
      .getByLabelText(/email/i)
      .type('tt@ertf.com')
      .getByLabelText(/password/i)
      .type('1234')
      .getByTestId('submit')
      .click()
      .getByTestId('error')
      .should(($error) => {
        expect($error[0].textContent).to.contain('Password or username is incorrect');
      });
  });
});
