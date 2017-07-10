var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports.webpack = {
  entry: {
    'chat-page': './assets/js/chat-page.js',
    'login-page': './assets/js/login-page.js',
    'styles': './assets/styles/importer.less'
  },
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, '..', '.tmp', 'public')
  },
  module: {
    rules: [
      // Extract less files
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({use: 'css-loader!less-loader'})
      }
    ]
  },
  loaders: [
    {
      test: /\.ejs$/,
      loader: 'ejs-loader',
      query: {
        variable: 'data',
        interpolate : '\\{%=([\s\S]+?)%\\}',
        escape : '\\{%-([\s\S]+?)%\\}',
        evaluate : '\\{%([\s\S]+?)%\\}',
      }
    },
  ],
  // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
  plugins: [
    new ExtractTextPlugin('styles/[name].css'),
    new CleanWebpackPlugin(['public'], {
      root: path.resolve(__dirname, '.tmp'),
      verbose: true,
      dry: false
    }),
    new HtmlWebpackPlugin({  // Also generate a test.html
      filename: 'views/layout.ejs',
      template: 'views/layout.ejs'
    })

  ]
};
