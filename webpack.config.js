const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.js',
    './src/index.css',
  ],

  output: {
    path: __dirname + '/public/',
    filename: 'bundle.js',
  },

  // devServer: {
  //   inline: true,
  //   port: 7777,
  //   contentBase: __dirname + '/public/',
  // },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react'],
        },
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin( {
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin( {
      compress: {
        warnings: true,
      },
    }),
  ],

};
