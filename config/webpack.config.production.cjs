const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerWebpackPlugin = require('image-minimizer-webpack-plugin');

module.exports = (root) => ({
  devtool: 'source-map', 
  entry: path.join(root, 'src', 'lib', 'index.ts'),
  experiments: {
    outputModule: true,
  },
  mode: 'production',
  module: {
    rules: [
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] },
      { test: /\.ts$/, use: ['ts-loader'], exclude: /node_modules/ },
      { test: /\.(gif|jpg|jpeg|png|svg|webp)$/, type: 'asset' },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinizerWebpackPlugin(),
      new ImageMinimizerWebpackPlugin({
        minimizer: {
          implementation: ImageMinimizerWebpackPlugin.squooshMinify,
          options: {}
        },
      }),
    ],
  },
  output: {
    clean: true,
    filename: '[name].js',
    globalObject: 'this',
    library: {
      type: 'module'
    },
    path: path.resolve(root, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
});
