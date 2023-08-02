const path = require('path');

module.exports = (root) => ({
  entry: path.join(root, 'dist', 'main.js'),
  mode: 'none',
  devServer: {
    static: path.join(root, 'dist'),
  },
});
