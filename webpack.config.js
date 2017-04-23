var path = require('path');
var webpack = require('webpack');
module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:8080', 'webpack/hot/only-dev-server', './src/index'
  ],
  output: {
    path: __dirname + '/public/js' ,
    filename: 'bundle.js',
    publicPath: '/js/'
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: [
          'react-hot', 'babel'
        ],
        include: path.join(__dirname, 'src')
      }
    ]
  }
};
