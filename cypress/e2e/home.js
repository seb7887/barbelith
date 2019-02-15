describe('Home', () => {
  beforeEach(() => {
    cy.exec('npm run db:clean');
  });

  it('User Feed: should follow an user', () => {
    cy.createUser().then(() => {
      cy.createUser().then(user => {
        cy.signinUser(user).then(() => {
          cy.visit('/')
            .getByTestId('follow#0')
            .click()
            .getByTestId('snack')
            .should(($snack) => {
              expect($snack[0].textContent).to.contain('Following');
            });
        });
      });
    });
  });

  it('Post Feed: should add a new post', () => {
    const text = 'text post';
    cy.createUser().then(user => {
      cy.signinUser(user).then(() => {
        cy.visit('/')
          .getByPlaceholderText(/what's on your mind/i)
          .type(text)
          .getByTestId('submit')
          .click()
          .getByTestId('content')
          .should(($content) => {
            expect($content[0].textContent).to.contain(text);
          });
      });
    });
  });

  it('Post Feed: should delete a post', () => {
    cy.createUser().then(user => {
      cy.signinUser(user).then(user => {
        cy.addPost(user).then(() => {
          cy.visit('/')
            .getByTestId('delete-button')
            .click();
        });
      });
    });
  });

  it('Post Feed: should like a post', () => {
    cy.createUser().then(user => {
      cy.signinUser(user).then(user => {
        cy.addPost(user).then(() => {
          cy.visit('/')
            .getByTestId('like-button')
            .click();
        });
      });
    });
  });

  it('Post Feed: should add a comment', () => {
    const textComment = 'text comment';
    cy.createUser().then(user => {
      cy.signinUser(user).then(user => {
        cy.addPost(user).then(() => {
          cy.visit('/')
            .getByLabelText(/add comments/i)
            .type(textComment)
            .getByTestId('form')
            .submit()
            .getByTestId('comment')
            .should(($comment) => {
              expect($comment[0].textContent).to.contain(textComment);
            });
        });
      });
    });
  });

  it('Post Feed: should delete a comment', () => {
    const textComment = 'text comment';
    cy.createUser().then(user => {
      cy.signinUser(user).then(user => {
        cy.addPost(user).then(() => {
          cy.visit('/')
            .getByLabelText(/add comments/i)
            .type(textComment)
            .getByTestId('form')
            .submit()
            .getByTestId('comment')
            .should(($comment) => {
              expect($comment[0].textContent).to.contain(textComment);
            })
            .getByTestId('delete-comment')
            .click();
        });
      });
    });
  });
});
