import { generateUser } from '../support/generate';

describe('Signup', () => {
  beforeEach(() => {
    cy.exec('npm run db:clean');
  });

  it('should register a new user', () => {
    const user = generateUser();
    cy.visit('/')
      .getByTestId('signup-button')
      .click()
      .getByLabelText(/name/i)
      .type(user.name)
      .getByLabelText(/email/i)
      .type(user.email)
      .getByLabelText(/password/i)
      .type(user.password)
      .getByTestId('submit')
      .click()
      .getByTestId('success')
      .should(($success) => {
        expect($success[0].textContent).to.contain(`User ${user.name} successfully created!`);
      });
  });

  it('should display an error if input validation failed', () => {
    cy.server();
    cy.route({
      method: 'POST',
      url: 'http://localhost:8080/signup',
      status: '500',
      response: {}
    });
    cy.visit('/signup')
      .getByLabelText(/name/i)
      .type('tt')
      .getByLabelText(/email/i)
      .type('ab@ab')
      .getByLabelText(/password/i)
      .type('1234')
      .getByTestId('submit')
      .click()
      .getByTestId('error')
      .should(($error) => {
        expect($error[0].textContent).to.contain('must be');
      });
  });
});
