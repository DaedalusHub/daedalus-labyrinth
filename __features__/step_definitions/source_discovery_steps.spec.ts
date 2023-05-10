import { InputForm } from '../src/user_interface';
import { SearchEngine, Source } from '../src/data_retrieval';
import { SummaryGenerator } from '../src/summarization';
import { Embedding, EmbeddingGenerator } from '../src/embeddings';
import { WeaviateClient } from '../src/weaviate_storage';
import { Given, Then, When } from '@cucumber/cucumber';

// Initialize variables for storing data
let userInput: string;
let sourceList: Source[];
let summaryList: string[];
let embeddingList: Embedding[];

// Initialize application modules
const inputForm = new InputForm();
const searchEngine = new SearchEngine();
const summaryGenerator = new SummaryGenerator();
const embeddingGenerator = new EmbeddingGenerator();
const weaviateClient = new WeaviateClient();

Given('the user is on the input form', async function () {
  // Open the input form in the browser
  await inputForm.open();
});

When('the user enters {string}', async function (input: string) {
  // Enter user input into the input form
  userInput = input;
  await inputForm.setInput(input);
});

When('the user submits the form', async function () {
  // Submit the input form and trigger source discovery
  await inputForm.submit();
  sourceList = await searchEngine.search(userInput);
});

Then('the application starts the process of finding sources', function () {
  // Confirm that the input form was submitted successfully
  expect(sourceList).toBeDefined();
  expect(sourceList.length).toBeGreaterThan(0);
});

Given(/^the user has submitted a subject or description$/, function () {});

When('the application searches for sources', async function () {
  // Search for sources based on user input
  sourceList = await searchEngine.search(userInput);
});

Then('the application retrieves a list of relevant sources', function () {
  // Confirm that a list of sources was retrieved successfully
  expect(sourceList).toBeDefined();
  expect(sourceList.length).toBeGreaterThan(0);
});

Given(/^the application has retrieved a list of sources$/, function () {});

When('the application processes each source', async function () {
  // Generate summaries for each source
  summaryList = [];
  for (const source of sourceList) {
    const summary = await summaryGenerator.summarize(source);
    summaryList.push(summary);
  }
});

Then('the application creates a summary of each source', function () {
  // Confirm that a summary was generated for each source
  expect(summaryList).toBeDefined();
  expect(summaryList.length).toBe(sourceList.length);
});

Given(/^the application has created summaries of the sources$/, function () {});

When('the application processes each summary', async function () {
  // Generate embeddings for each summary
  embeddingList = [];
  for (const summary of summaryList) {
    const embedding = await embeddingGenerator.generate(summary);
    embeddingList.push(embedding);
  }
});

Then('the application generates an embedding for each summary', function () {
  // Confirm that an embedding was generated for each summary
  expect(embeddingList).toBeDefined();
  expect(embeddingList.length).toBe(summaryList.length);
});

Given(
  /^the application has generated embeddings for each summary$/,
  function () {}
);

When('the application adds the embeddings to Weaviate', async function () {
  // Store embeddings in Weaviate
  for (let i = 0; i < embeddingList.length; i++) {
    const source = sourceList[i];
    const embedding = embeddingList[i];
    await weaviateClient.addEmbedding(embedding, source);
  }
});
Then(/^the embeddings are stored in Weaviate$/, function () {});

Given(
  /^the application has stored the embeddings in Weaviate$/,
  function () {}
);
Given(/^the user has viewed the results$/, function () {});

Then(
  'the user sees a list of sources, summaries, and embeddings',
  async function () {
    // Verify that the results are displayed properly
    const results = await weaviateClient.getResults();
    expect(results).toBeDefined();
    expect(results.length).toBeGreaterThan(0);
  }
);
