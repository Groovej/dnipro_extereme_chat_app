const webpack = require('webpack');
const config = require('./webpack.common.config.js');
const NODE_ENV = 'development'

config.plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(NODE_ENV)
    }
  }),
]
config.devtool = "inline-cheap-source-map"

module.exports = config;
