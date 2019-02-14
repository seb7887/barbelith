import { generateUser } from './generate';

Cypress.Commands.add('createUser', overrides => {
  const user = generateUser();
  return cy
    .request({
      url: 'http://localhost:8080/api/auth/signup',
      method: 'POST',
      body: user
    })
    .then(() => user);
});

Cypress.Commands.add('assertHome', () => {
  cy.url().should('eq', `${Cypress.config().baseUrl}/`)
});

Cypress.Commands.add('assertLoggedInAs', user => {
  cy.window()
    .its('cookies.token')
    .should('be.a', 'string')
    .getByTestId('username-display', { timeout: 500 })
    .should('have.text', user.username);
});
