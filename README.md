# Daedalus Labyrinth

The project provides a TypeScript application that generates a list of sources, such as websites, books, academic
papers, and other sources, based on a given subject or description. It then iteratively processes the list, creates
summaries of each source, creates an embedding from the summary, and adds the embeddings to Weaviate.

## Features

- User-friendly input form to collect user's subject or description
- Data retrieval module to fetch relevant sources from search engine API
- Summarization module to generate summaries of each source using an API (e.g. OpenAI's GPT)
- Embeddings module to create embeddings from summaries using an API (e.g. OpenAI's CLIP)
- Weaviate storage module to store embeddings in Weaviate instance

## Installation

1. Clone the repository: `git clone <repo-url>`
2. Install dependencies: `yarn install`

## Usage

1. Start the application: `yarn dev`
2. Open your browser and go to `http://localhost:3000/`
3. Enter your subject or description in the input field and click "Submit"
4. Wait for the application to retrieve sources, generate summaries, create embeddings, and store embeddings in Weaviate
5. View the embeddings and other metadata in Weaviate dashboard

## Technology Stack

- TypeScript
- OpenAI GPT (for text summarization)
- OpenAI CLIP (for embeddings generation)
- Weaviate (for embeddings storage)
- Vite (for development and build)
- React.js (for front-end)

## Directory Structure

```text
├── src/
│   ├── user_interface/
│   ├── data_retrieval/
│   ├── summarization/
│   ├── embeddings/
│   └── weaviate_storage/
├── __tests__/
└── __features__/
```

## Contributors

- [Sam Biggins](https://github.com/smileyet) - Creator and maintainer

## License

This project is licensed under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0).
