module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: [
    '<rootDir>/src/**/*.spec.ts',
    '<rootDir>/__tests__/**/*.spec.ts',
    '<rootDir>/__features__/**/*.feature',
  ],
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
};
