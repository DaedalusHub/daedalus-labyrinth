Feature: Source discovery and summarization
  As a user
  I want to find and summarize various sources based on a given subject or description
  So that I can quickly understand the information available

  Scenario: User submits a subject or description
    Given the user is on the input form
    When the user enters a subject or description
    And the user submits the form
    Then the application starts the process of finding sources

  Scenario: Application retrieves a list of sources
    Given the user has submitted a subject or description
    When the application searches for sources
    Then the application retrieves a list of relevant sources

  Scenario: Application summarizes the sources
    Given the application has retrieved a list of sources
    When the application processes each source
    Then the application creates a summary of each source

  Scenario: Application generates embeddings from summaries
    Given the application has created summaries of the sources
    When the application processes each summary
    Then the application generates an embedding for each summary

  Scenario: Application stores embeddings in Weaviate
    Given the application has generated embeddings for each summary
    When the application processes each embedding
    Then the application adds the embeddings to Weaviate

  Scenario: User views the results
    Given the application has added the embeddings to Weaviate
    When the user views the results
    Then the user sees a list of sources, summaries, and embeddings
