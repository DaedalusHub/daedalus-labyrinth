import {
  Before,
  Given,
  Then,
  When,
} from '@badeball/cypress-cucumber-preprocessor';

Before(() => {
  cy.intercept('GET', '/customsearch/*', {
    statusCode: 200,
    body: {
      items: [
        {
          title: 'Test Source 1',
          url: 'http://testsource1.com',
          snippet: 'Test Snippet 1',
        },
        {
          title: 'Test Source 2',
          url: 'http://testsource2.com',
          snippet: 'Test Snippet 2',
        },
      ],
    },
  }).as('search');

  cy.intercept('GET', '/api/summarize*', {
    statusCode: 200,
    body: {
      summary: 'Test Summary',
    },
  }).as('getSummary');
});

Given('I am on the homepage', () => {
  cy.visit('/');
});

When('I enter {string} into the input field', (subject) => {
  cy.get('input#outlined-basic').type(subject);
});

When('I click on the submit button', () => {
  cy.get('button[type="submit"]').click();
  cy.wait('@search')
});

Then('I should see the following sources:', (dataTable) => {
  dataTable.hashes().forEach((row) => {
    cy.contains(row.title);
    cy.contains(row.snippet);
  });
});

Given('I have searched for a subject', () => {
  cy.visit('/');
  cy.get('input#outlined-basic').type('Test Subject');  // 'Test Subject' is hardcoded here
  cy.get('button[type="submit"]').click();
  cy.wait('@search');
});


When('I click on the Summarize button for the source {string}', (sourceTitle) => {
  cy.contains(sourceTitle).parent().within(() => {
    cy.get('button').contains('Summarize').click();
    cy.wait('@getSummary')
  });
});

Then('I should see a summary for the source {string}', (sourceTitle) => {
  cy.contains(sourceTitle).parent().parent().within(() => {
    cy.contains('Test Summary');
  });
});
