module.exports = {
  ...require('./jest.common'),
  displayName: 'server',
  testEnvironment: 'node',
  testMatch: ['**/__server_tests__/**/*.js'],
  modulePathIgnorePatterns: ['helpers']
};
