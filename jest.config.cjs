module.exports = {
    // ... other Jest configurations
    transform: {
      '^.+\\.tsx?$': 'babel-jest',
    },
  },
  

  {
    // ... other package.json configurations
    "jest": {
      "testMatch": [
        "<rootDir>/src/__tests__/*.test.tsx"
      ]
    },
  }
  