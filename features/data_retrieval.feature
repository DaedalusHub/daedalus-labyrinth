Feature: Data Retrieval

  As a user,
  I want to get a list of sources related to my input,
  So that I can see information related to my query

  Scenario: User submits a query
    Given I am on the main page
    When I enter "OpenAI" into the input field
    And I click on the submit button
    Then I should see a list of sources related to "OpenAI"
