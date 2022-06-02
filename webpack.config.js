const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: {
      assert: require.resolve("assert"),
      events: require.resolve("events"),
      fs: require.resolve("browserify-fs"),
      path: require.resolve("path-browserify"),
      stream: require.resolve("stream-browserify"),
      util: require.resolve("util"),
      zlib: require.resolve("browserify-zlib"),
    },
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "lib"),
  },
};
