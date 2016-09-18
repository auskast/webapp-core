const path = require('path');

// helpers
function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}

function deepAssign(target, source) {
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepAssign(target[key], source[key]);
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    });
  }

  return target;
}

// default config
const config = {
  env: process.env.NODE_ENV || 'development',

  path: {
    root: path.resolve(__dirname, '..'),
    src: 'src',
    test: 'test',
    dist: 'dist',
    static: 'static',
  },

  server: {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000,
    devPort: process.env.DEV_PORT || 4000,
    disableSSR: false, // debug server side rendering
  },

  compiler: {
    babel: {
      presets: [
        'react',
        'es2015',
        'stage-0',
      ],
      plugins: [
        'transform-runtime',
        'add-module-exports',
        'react-hot-loader/babel',
      ]
    },
    devtool: 'cheap-module-eval-source-map',
    hashType: 'hash',
    failOnWarning: false,
    quiet: false,
    publicPath: '/',
    stats: {
      chunks: false,
      chunkModules: false,
      colors: true
    },
    vendors: [
      'react',
      'react-dom',
      'react-helmet',
      'redux',
      'react-redux',
      'react-router',
      'react-router-redux',
    ]
  },
};

// globals
config.globals = {
  isDevelopment: config.env !== 'production'
};

// environment overrides
const environments = {
  development: {
    compiler: {
      publicPath: `http://${config.server.host}:${config.server.devPort}/`,
    }
  },
  production: {
    compiler: {
      publicPath: '/',
      failOnWarning: false,
      hashType: 'chunkhash',
      devtool: null,
      stats: {
        chunks: true,
        chunkModules: true,
        colors: true,
      },
    }
  }
};

deepAssign(config, environments[config.env]);

// path utils
function getPath(...paths) {
  const args = [config.path.root].concat(...paths);
  return path.resolve(...args);
}

config.utils = {
  paths: {}
};

Object.keys(config.path).forEach((pathName) => {
  Object.assign(config.utils.paths, {
    [pathName]: pathName === 'root' ?
      getPath :
      getPath.bind(null, pathName)
  });
});

module.exports = config;
