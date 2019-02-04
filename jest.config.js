module.exports = {
  ...require('./test/jest.common'),
  collectCoverageFrom: [
    '!**/__tests__/**',
    '!**/node_modules/**'
  ],
  projects: [
    './test/jest.client.js',
    './test/jest.server.js',
  ]
};
