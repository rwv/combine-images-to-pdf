const path = require("path");
const webpack = require('webpack');

module.exports = {
  entry: "./src/index.ts",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "babel-loader",
      },
    ],
  },
  plugins: [
    // Work around for Buffer is undefined:
    // https://github.com/webpack/changelog-v5/issues/10
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: {
      assert: require.resolve("assert"),
      events: require.resolve("events"),
      fs: require.resolve("browserify-fs"),
      path: require.resolve("path-browserify"),
      process: require.resolve('process/browser'),
      stream: require.resolve("stream-browserify"),
      util: require.resolve("util"),
      zlib: require.resolve("browserify-zlib"),
    },
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "lib"),
    chunkFormat: "module",
  },
};
