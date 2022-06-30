const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const Webpack = require("webpack");
// const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./app/src/js/app.js",
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "app", "dist"),
    clean: true
  },
  module: {
    rules: [
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader"] }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerWebpackPlugin(),
      "..."
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "app", "src", "index.html"),
      filename: "index.html",
      hash: true,
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
    new Webpack.optimize.ModuleConcatenationPlugin()
    // new CopyWebpackPlugin({
    //   patterns: [
    //     { from: path.join(__dirname, "app", "src", "css"), to: "css" }
    //   ]
    // })
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3000,
  }
}