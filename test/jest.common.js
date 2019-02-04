const path = require('path');

module.exports = {
  rootDir: path.join(__dirname, '..'),
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
    'jest-watch-select-projects'
  ]
};
