const webpack = require('webpack');
const config = require('./webpack.common.config.js');
const NODE_ENV = 'production'

config.plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(NODE_ENV)
    }
  }),
  new webpack.optimize.UglifyJsPlugin(),
]

module.exports = config;
