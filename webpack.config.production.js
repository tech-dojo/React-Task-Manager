var path = require('path');
var webpack = require('webpack');
module.exports = {
  devtool: 'eval',
  entry: [
 './src/index'
  ],
  output: {
    path: __dirname + '/public/js' ,
    filename: 'bundle.js'
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
