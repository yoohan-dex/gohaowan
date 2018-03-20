const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"https://ghw123.com"',
  REDIRECT_PATH: '"http://ghw.work2pix.top/app/login/auth?redirect="',
  IMAGE_PREFIX: '"http://ghw.work2pix.top"',
});
