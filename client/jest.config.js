module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}'
  ],
  moduleNameMapper: {
    "\\.(css|sass)$": "identity-obj-proxy",
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
};
