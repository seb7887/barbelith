import { generateUser, generatePost } from './generate';

Cypress.Commands.add('createUser', () => {
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
  cy.url().should('eq', `${Cypress.config().baseUrl}/`);
});

Cypress.Commands.add('signinUser', user => {
  return cy
    .request({
      url: 'http://localhost:8080/api/auth/signin',
      method: 'POST',
      body: { email: user.email, password: user.password }
    })
    .then(loggedUser => loggedUser);
});

Cypress.Commands.add('addPost', user => {
  const post = { text: 'test post' };
  return cy
    .request({
      url: `http://localhost:8080/api/posts/new/${user.body._id}`,
      method: 'POST',
      body: post
    })
    .then((posted) => posted);
});
