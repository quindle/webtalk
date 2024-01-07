//webpack.config.js
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  node: { global: true },
  mode: "development",
  devtool: "inline-source-map",
  /*experiments: {
    outputModule: true,
  },*/
  entry: path.resolve(__dirname, './src'),
  plugins: [
    new ForkTsCheckerWebpackPlugin()
  ],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: "webtalklib_pack.js", // <--- Will be compiled to this single file
    clean: true,
    libraryTarget: 'umd',
    globalObject: `(typeof self !== 'undefined' ? self : this)`,
    umdNamedDefine: true,
    library: "webtalklib"
    /*library: {
      type: 'module'
    }*/
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  }
};

// execute build with command "npx webpack -w"