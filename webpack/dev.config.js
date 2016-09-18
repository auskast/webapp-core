require('babel-polyfill');

const webpack = require('webpack');

const config = require('../config');

const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

const paths = config.utils.paths;
const compiler = config.compiler;

module.exports = {
  devtool: compiler.devtool,
  context: paths.root(),
  entry: {
    main: [
      `webpack-hot-middleware/client?path=${compiler.publicPath}__webpack_hmr`,
      'react-hot-loader/patch',
      paths.src('client.js')
    ],
    // vendor: config.compiler.vendors, // TODO only in prod
  },
  output: {
    path: paths.dist(),
    filename: `[name]-[${compiler.hashType}].js`,
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: compiler.publicPath
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: compiler.babel
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loader: 'file?name=[name]-[hash].[ext]'
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('fonts'),
        loader: 'file?name=[name]-[hash].[ext]'
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('styles'),
        loader: 'style!css!sass?sourceMap'
      },
    ]
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js']
  },
  plugins: [
    // TODO only in prod
    // new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.OccurrenceOrderPlugin(),
    // new webpack.optimize.CommonsChunkPlugin('vendor', `vendor-[${compiler.hashType}].js`),
    new webpack.NoErrorsPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/), // TODO why?
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: config.globals.isDevelopment,
      'process.env.NODE_ENV': `"${config.env}"`,
    }),
    new webpack.HotModuleReplacementPlugin(),
    webpackIsomorphicToolsPlugin.development()
  ]
};
