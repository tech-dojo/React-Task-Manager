var path = require('path');
var webpack = require('webpack');
module.exports = {
  devtool: 'source-map',
  entry: [
 './src/index'
  ],
  output: {
    path: __dirname + '/public/js' ,
    filename: 'bundle.js'
  },
  plugins : [ new webpack.optimize.UglifyJsPlugin({
       compress:{
         warnings: false
       },
       sourceMap: true,
comments: false
     }),new webpack.optimize.DedupePlugin()],

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
