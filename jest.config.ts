import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: 'src',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    moduleNameMapper: {
        '^prisma/(.*)$': '<rootDir>/prisma/$1',
        '^common/(.*)$': '<rootDir>/common/$1',
        '^modules/(.*)$': '<rootDir>/modules/$1'
    },
    collectCoverageFrom: [
        '**/*.(t|j)s'
    ],
    coverageDirectory: '../coverage',
    verbose: true,
};

export default config;
