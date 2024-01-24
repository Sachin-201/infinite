module.exports = {
    // ... other Jest configurations
      testEnvironment: "jsdom",

    transform: {
      '^.+\\.tsx?$': 'babel-jest',
    },
  },


{
  "jest": {
    "testEnvironment": "jsdom",
    "testMatch": [
      "<rootDir>/src/__tests__/*.test.tsx"
    ]
    // ... other Jest configurations
  }
}
  