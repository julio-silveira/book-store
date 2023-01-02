module.exports = {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/dist/', '/node_modules/', '/public/'],
  collectCoverageFrom: ['src/**/*.ts(x)?', '!src/**/index.ts', '!src/main.tsx'],
  modulePaths: ['<rootDir>/src/'],
  transform: {
    '^.+\\.tsx?$': 'babel-jest'
  }
}
