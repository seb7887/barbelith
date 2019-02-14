describe('Signin', () => {
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
        .assertHome();
    });
  });
});