module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src'],
    testTimeout: 30_000,
    extensionsToTreatAsEsm: ['.ts'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    moduleNameMapper: {
      '@functions/(.*)': '<rootDir>/src/functions/$1',
      '@libs/(.*)': '<rootDir>/src/libs/$1',
      '@model/(.*)': '<rootDir>/src/model/$1',
      '@services/(.*)': '<rootDir>/src/services/$1',
      '@tests/(.*)': '<rootDir>/src/tests/$1',
    },
}