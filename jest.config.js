module.exports = {
    testEnvironment: "jsdom",
    moduleNameMapper: {
      "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
      "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.js",
      //"react-redux": require.resolve('react-redux'),
    },
    verbose: true,
    transform: {
      '^.+\\.js$': 'babel-jest',
      '^.+\\.jsx$': 'babel-jest',
    },
    // // テスト対象の拡張子を列挙する
    // moduleFileExtensions: ["js", "jsx"],
    transformIgnorePatterns: [
      "/node_modules/(?!(jest-)?react-redux|axios)"
    ],
  }