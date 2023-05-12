import React from 'react';
import InputForm from './index';
import { SearchEngine } from '../data_retrieval/search_engine';
import { Source } from '@src/data_retrieval/source';

class MockSearchEngine extends SearchEngine {
  async search(query: string): Promise<Source[]> {
    return [];
  }
}

describe('<InputForm />', () => {
  it('renders', () => {
    // Create a new instance of the mock search engine
    const searchEngine = new MockSearchEngine('key', 'cx');

    // see: https://on.cypress.io/mounting-react
    cy.mount(<InputForm searchEngine={searchEngine} />);
  });
});
