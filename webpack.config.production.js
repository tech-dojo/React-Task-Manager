var path = require('path');
var webpack = require('webpack');
var BUILD_DIR = path.resolve(__dirname, './dist');

module.exports = {
  devtool: 'eval',
  entry: [
 './src/index'
  ],
  output: {
    path: __dirname + '/public/js' ,
    filename: 'rmgbund.js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: [
           'babel'
        ],
        include: path.join(__dirname, 'src')
      }
    ]
  }
};
