import {
  Before,
  Given,
  Then,
  When,
} from '@badeball/cypress-cucumber-preprocessor';

Before(() => {
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
});

Given('I am on the homepage', () => {
  cy.visit('/');
});

When('I enter {string} into the input field', (subject) => {
  cy.get('input#outlined-basic').type(subject);
});

When('I click on the submit button', () => {
  cy.get('button[type="submit"]').click();
});

Then('I should see the following sources:', (dataTable) => {
  dataTable.rawTable.slice(1).forEach(([source, link]) => {
    cy.get('div').should('contain', source);
    cy.get('div').should('contain', link);
  });
});
