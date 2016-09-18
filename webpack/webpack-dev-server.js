#!/usr/bin/env node

const Express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('../config');
const webpackConfig = require('./dev.config');

const compiler = webpack(webpackConfig);

const serverOptions = {
  contentBase: `http://${config.server.host}:${config.server.devPort}`,
  quiet: config.compiler.quiet,
  noInfo: config.compiler.quiet,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: config.compiler.stats,
  // serverSideRender: true, // TODO later?
};

const app = new Express();

app.use(webpackDevMiddleware(compiler, serverOptions));
app.use(webpackHotMiddleware(compiler));

/* eslint-disable no-console */
app.listen(config.server.devPort, (err) => {
  if (err) {
    console.error('DEV SERVER ERROR:', err);
  } else {
    console.info(`webpack dev server listening on port ${config.server.devPort}`);
  }
});
/* eslint-enable */
