//webpack.config.js
const path = require('path');

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  experiments: {
    outputModule: true,
  },
  entry: {
    main: "./src/index.ts",
  },
  plugins: [],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: "webtalklib.js", // <--- Will be compiled to this single file
    clean: true,
    library: {
      type: 'module'
    }
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  }
};

// execute build with command "npx webpack -w"