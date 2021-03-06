module.exports = {
  testPathIgnorePatterns: ["/node-modules/", "/.next/"],
  setupFilesAfterEnv: [
    "<rootDir>/tests/setupTests.ts"
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
  },
  testEnvironment: 'jsdom'
};
