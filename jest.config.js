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
        '^@libs/api-gateway$': '<rootDir>/src/libs/api-gateway.ts',
        '^@libs/lambda$': '<rootDir>/src/libs/lambda.ts',
        //'^@middy/core$': '<rootDir>/src/libs/lambda.ts',
        '^@functions/persona/handler$': '<rootDir>/src/functions/persona/handler.ts',
        '^src/(.*)$': '<rootDir>/src/$1',
    },
}