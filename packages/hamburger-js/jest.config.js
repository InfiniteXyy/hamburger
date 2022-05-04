const path = require('path');

module.exports = {
  transform: { '^.+\\.[jt]sx?$': ['babel-jest', { configFile: path.resolve(__dirname, '.babelrc') }] },
  testMatch: ['**/test/**/*.js?(x)'],
  setupFilesAfterEnv: ['<rootDir>/scripts/setupTests.js'],
};
