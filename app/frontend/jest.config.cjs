module.exports = {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/dist/', '/node_modules/', '/public/'],
  collectCoverageFrom: ['src/**/*.ts(x)?', '!src/**/index.ts', '!src/main.tsx'],
  modulePaths: ['<rootDir>/src/'],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.js'],
  transform: {
    '^.+\\.tsx?$': 'babel-jest'
  }
}
