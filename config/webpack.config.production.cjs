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
      { test: /\.(gif|jpg|jpeg|png|svg|webp)$/, type: 'asset/resource' },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinizerWebpackPlugin(),
      new ImageMinimizerWebpackPlugin({
        generator: [
          {
            // You can apply generator using `?as=webp`, you can use any name and provide more options
            preset: 'webp',
            implementation: ImageMinimizerWebpackPlugin.sharpGenerate,
            options: {
              encodeOptions: {
                webp: {
                  quality: 75,
                },
              },
            },
          },
        ],
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
    // Uncomment for multi-language (spanish)
    /* new HtmlWebpackPlugin({
      filename: path.join('es', 'index.html'),
      template: path.join(root, 'src', 'es', 'index.html'),
    }), */
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

