const development = require('./config/webpack.config.development.cjs');
const production = require('./config/webpack.config.production.cjs');

switch (process.env.npm_lifecycle_event) {
case 'build':
  module.exports = production(__dirname);
  break;
case 'dev':
  module.exports = development(__dirname);
  break;
}
