#!/usr/bin/env node

require('babel-core/register');

const config = require('../config');

const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
const webpackIsomorphicTools = require('../webpack/webpack-isomorphic-tools');

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = config.server.disableSSR;
global.__DEVELOPMENT__ = config.globals.isDevelopment;

global.webpackIsomorphicTools = new WebpackIsomorphicTools(webpackIsomorphicTools)
  .development(__DEVELOPMENT__)
  .server(config.utils.paths.root(), () => {
    require('../src/server');
  });
