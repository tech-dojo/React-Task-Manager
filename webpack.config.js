var path = require('path');
var webpack = require('webpack');
var BUILD_DIR = path.resolve(__dirname, './dist');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:8080', 'webpack/hot/only-dev-server', './src/index'
  ],
  output: {
    path: BUILD_DIR ,
    filename: 'rmgbund.js',
    publicPath: '/static/'
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
