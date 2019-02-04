module.exports = {
  ...require('./jest.common'),
  displayName: 'client',
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/__tests__/**/*.js']
};
