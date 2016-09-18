const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

const paths = require('../config').utils.paths;

module.exports = {
  assets: {
    images: {
      extensions: ['jpeg', 'jpg', 'png', 'gif', 'svg'],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },
    fonts: {
      extensions: ['woff', 'woff2', 'ttf', 'eot'],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },
    styles: {
      extensions: ['css', 'scss', 'sass'],
      filter: (module, regex, options, log) => {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.style_loader_filter(module, regex, options, log);
        }
        return regex.test(module.name);
      },
      path: (module, options, log) => {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.style_loader_path_extractor(module, options, log);
        }
        return module.name;
      },
      parser: (module, options, log) => {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.css_loader_parser(module, options, log);
        }
        return module.source;
      }
    },
    json: {
      extensions: ['json'],
      include: [paths.root()]
    },
  },
  // patch_require: true // TODO later
};
