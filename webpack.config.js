const Dotenv = require('dotenv-webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var distPath = path.resolve('./src/dist');

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    path: distPath,
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
            presets: ['es2015']
        }
      }
    ],
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                require('babel-plugin-transform-object-rest-spread'),
                require('babel-plugin-transform-runtime')
              ]
            }
          }
        ]
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
              publicPath: 'images/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new ExtractTextPlugin(
      '[name].css'
    ),
    new Dotenv()
  ]
};
