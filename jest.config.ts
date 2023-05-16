module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts', '__tests__/*.feature'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
    '@test/(.*)': '<rootDir>/__tests__/$1',
    '@pages/(.*)': '<rootDir>/pages/$1',
    '@components/(.*)': '<rootDir>/components/$1',
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
