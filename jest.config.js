module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['__tests__/**/*.{spec,test}.ts', '__tests__/**/*.feature'],
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
};
