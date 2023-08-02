const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerWebpackPlugin = require('image-minimizer-webpack-plugin');

module.exports = (root) => ({
  devtool: 'source-map', 
  entry: path.join(root, 'src', 'index.ts'),
  mode: 'production',
  module: {
    rules: [
      { test: /\.html$/, loader: 'html-loader' },
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
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      },
      chunks: 'all'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.join(root, 'src', 'index.html') }),
    new HtmlWebpackPlugin({
      filename: path.join('es', 'index.html'),
      template: path.join(root, 'src', 'es', 'index.html'),
    }),
    new MiniCssExtractPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.ts'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(root, 'dist'),
    clean: true,
  },
});
