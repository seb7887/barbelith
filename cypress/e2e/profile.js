describe('Profile', () => {
  beforeEach(() => {
    cy.exec('npm run db:clean');
  });

  it('UnAuth User: should see user posts', () => {
    cy.createUser().then(user => {
      cy.signinUser(user).then(user => {
        cy.addPost(user).then(() => {
          cy.createUser().then(newUser => {
            cy.signinUser(newUser).then(user => {
              cy.visit('/')
                .getByTestId('user-profile')
                .click();
            });
          });
        });
      });
    });
  });
});
