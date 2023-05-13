Feature: Input Form
  As a user
  I want to submit a subject
  So that I can view a curated list of sources

  Scenario: Submit a subject and view results
    Given I am on the homepage
    When I enter "Test Subject" into the input field
    And I click on the submit button
    Then I should see the following sources:
      | source        | link                   |
      | Test Source 1 | http://testsource1.com |
      | Test Source 2 | http://testsource2.com |
