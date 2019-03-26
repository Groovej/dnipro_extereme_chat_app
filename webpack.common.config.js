const path = require('path');

module.exports = {
  context: __dirname,
  entry: [ "babel-polyfill", path.resolve(__dirname, './src/index.js')],
  output: {
    path: path.resolve(__dirname, './assets'),
    filename: 'application-compiled.js'
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.js', '.jsx', '.config.js'],
    modules: [ path.join(__dirname, 'src'), path.join(__dirname, 'node_modules')]
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      { test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
