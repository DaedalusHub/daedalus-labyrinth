Feature: Web Summarization
  As a user
  I want to search for a subject
  So that I can view a list curated list of sources and snippets
  And I want to summarize sources that I select

  Scenario: Submit a subject and view results
    Given I am on the homepage
    When I enter "Test Subject" into the input field
    And I click on the submit button
    Then I should see the following sources:
      | title         | url                    | snippet         |
      | Test Source 1 | http://testsource1.com | Test Snippet 1  |
      | Test Source 2 | http://testsource2.com | Test Snippet 2  |

  Scenario: Summarize a source
    Given I am on the homepage
    And I have searched for a subject
    When I click on the Summarize button for the source "Test Source 1"
    Then I should see a summary for the source "Test Source 1"
