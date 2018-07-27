module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: './assets',
    publicPath: '/',
    filename: 'application-compiled.js'
  },

  module: {
    loaders: [
      { test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      { test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
