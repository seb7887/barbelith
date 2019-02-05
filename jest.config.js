module.exports = {
  ...require('./test/jest.common'),
  collectCoverageFrom: [
    '**/components/**/*.js',
    '**/pages/**/*.js',
    '!**/__tests__/**',
    '!**/node_modules/**'
  ],
  projects: [
    './test/jest.client.js',
    './test/jest.server.js',
  ]
};
