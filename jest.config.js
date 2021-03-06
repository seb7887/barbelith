module.exports = {
  ...require('./test/jest.common'),
  collectCoverageFrom: [
    '**/components/**/*.js',
    '**/pages/**/*.js',
    '!**/utils/**',
    '!**/__tests__/**',
    '!**/stories/**',
    '!**/node_modules/**'
  ],
  projects: [
    './test/jest.client.js',
    './test/jest.server.js',
  ]
};
