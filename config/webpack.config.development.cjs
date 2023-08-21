const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (root) => {
  return {
    devtool: 'eval-source-map',
    devServer: {
      static: path.join(root, 'dist'),
      hot: true,
      watchFiles: [path.join(root, 'src', '*.html')],
    },
    entry: path.join(root, 'src', 'index.ts'),
    mode: 'development',
    module: {
      rules: [
        { test: /\.html$/, loader: 'html-loader' },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.ts$/,
          use: ['ts-loader'],
          exclude: /node_modules/,
        },
        { test: /\.(gif|jpg|jpeg|png|svg|webp)$/, type: 'asset/resource' },
      ],
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
  };
};
