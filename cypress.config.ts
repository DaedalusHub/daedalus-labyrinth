import { defineConfig } from 'cypress';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import browserify from '@badeball/cypress-cucumber-preprocessor/browserify';

async function setupNodeEvents(
  on: Cypress.PluginEvents,
  config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {

  await addCucumberPreprocessorPlugin(on, config);

  on(
    'file:preprocessor',
    browserify(config, {
      typescript: require.resolve('typescript'),
    })
  );

  return config;
}

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },

  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: [
      'cypress/e2e/**/*.cy.ts',
      'cypress/e2e/**/*.steps.ts',
      'cypress/e2e/**/*.feature',
    ],
    setupNodeEvents,
  },
});
