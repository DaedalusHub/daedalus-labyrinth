Feature: Source Summarization
  As a user
  I want to summarize a source
  So that I can quickly understand the source

  Scenario: User requests to summarize a source
    Given a source identified by a unique URL
    When the user requests to summarize the source
    Then the system should return a summarized version of the source
