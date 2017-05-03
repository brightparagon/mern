const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.js',
    './src/index.css'
  ],

  output: {
    path: __dirname + '/public/',
    filename: 'bundle.js'
  },

  // devServer: {
  //   inline: true,
  //   port: 7777,
  //   contentBase: __dirname + '/public/',
  // },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/],
        options: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }
    ]

    // loaders: [
    //   {
    //     test: /\.js$/,
    //     loader: 'babel-loader',
    //     exclude: /node_modules/,
    //     query: {
    //       cacheDirectory: true,
    //       presets: ['es2015', 'react'],
    //     },
    //   },
    //   {
    //     test: /\.css$/,
    //     loader: 'style-loader!css-loader',
    //   },
    //   {
    //     test: /\.(png|woff|woff2|eot|ttf|svg)$/,
    //     loader: 'url-loader?limit=100000',
    //   },
    // ],
  },

  devtool: 'source-map',

  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    // new webpack.optimize.UglifyJsPlugin( {
    //   compress: {
    //     warnings: true
    //   }
    // })
    new UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: true
      }
    })
  ]
};
