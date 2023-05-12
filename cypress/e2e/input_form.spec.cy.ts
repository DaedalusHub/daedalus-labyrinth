describe('Input Form', () => {
  it('allows the user to submit a subject and displays the results', () => {
    // Stub the call to the search engine
    cy.intercept('GET', '/customsearch/*', {
      statusCode: 200,
      body: {
        items: [
          {
            title: 'Test Source 1',
            link: 'http://testsource1.com',
            snippet: 'Test Snippet 1',
          },
          {
            title: 'Test Source 2',
            link: 'http://testsource2.com',
            snippet: 'Test Snippet 2',
          },
        ],
      },
    });

    // Visit the app
    cy.visit('/');

    // Find the input field and type in a subject
    cy.get('input#outlined-basic').type('Test Subject');

    // Submit the form
    cy.get('button[type="submit"]').click();

    // Check that the results are displayed
    cy.get('div').should('contain', 'Test Source 1');
    cy.get('div').should('contain', 'http://testsource1.com');
    cy.get('div').should('contain', 'Test Source 2');
    cy.get('div').should('contain', 'http://testsource2.com');
  });
});
