export default {
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                tsconfig: 'tsconfig.test.json',
            },
        ],
    },
    setupFilesAfterEnv: ['<rootDir>/src/test/setupTests.ts'],
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/src'],
    testPathIgnorePatterns: ['<rootDir>/src/test/playwright/'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
};
