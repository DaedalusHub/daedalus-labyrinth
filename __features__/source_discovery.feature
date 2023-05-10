Feature: Source discovery and summarization
  As a user
  I want to find and summarize various sources based on a given subject or description
  So that I can quickly understand the information available

  Scenario: User submits a subject or description
    Given the user is on the input form
    When the user enters "artificial intelligence"
    And the user submits the form
    Then the application starts the process of finding sources

  @ignore
  Scenario: Application retrieves a list of sources
    Given the user has submitted a subject or description
    When the application searches for sources
    Then the application retrieves a list of relevant sources

  @ignore
  Scenario: Application summarizes the sources
    Given the application has retrieved a list of sources
    When the application processes each source
    Then the application creates a summary of each source

  @ignore
  Scenario: Application generates embeddings from summaries
    Given the application has created summaries of the sources
    When the application processes each summary
    Then the application generates an embedding for each summary

  @ignore
  Scenario: Application stores embeddings in Weaviate
    Given the application has generated embeddings for each summary
    When the application adds the embeddings to Weaviate
    Then the embeddings are stored in Weaviate

  @ignore
  Scenario: User views the results
    Given the application has stored the embeddings in Weaviate
    And the user has viewed the results
    Then the user sees a list of sources, summaries, and embeddings
