
module.exports = {
    preset: 'ts-jest',
    testEnvironment: "node",
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/test/tsconfig.json',
        },
    },
    transformIgnorePatterns: [
        "node_modules/(?!troublesome-dependency/.*)",
    ],
    moduleNameMapper: {
        '^[NAME OF MODULE YOU WANT TO IMPORT]$': '[NAME OF MODULE YOU WANT TO IMPORT]/dist/cjs'
    }
}