module.exports = {
  setupFilesAfterEnv: ['<rootDir>/config/jest/setupTests.js'],
  moduleNameMapper: {
    '^.+\\.s?css$': '<rootDir>/config/jest/cssTransform.js',
  },
}
