const webpack = require('webpack');
const {resolve} = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  context: resolve(__dirname, 'src'),

  entry: [
    'babel-polyfill',
    // './src/index.js',
    // './src/index.css'

    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:4000',
    'webpack/hot/only-dev-server',
    './index.js'
  ],

  output: {
    filename: 'bundle.js',
    // path: __dirname + '/public/',
    path: __dirname + '/public/',
    publicPath: '/'
  },

  devtool: 'inline-source-map',

  // devServer: {
  //   inline: true,
  //   port: 7777,
  //   contentBase: __dirname + '/public/',
  // },
  devServer: {
    hot: true,
    contentBase: __dirname + '/public/',
    publicPath: '/',
    proxy: {
      "*": "http://localhost:3000"
    },
    stats: {
      // Config for minimal console.log mess.
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false
    }
  },

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

  plugins: [
    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),

    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),

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
