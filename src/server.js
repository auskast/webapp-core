import compression from 'compression';
import Express from 'express';
import http from 'http';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createHistory from 'react-router/lib/createMemoryHistory';
import { Provider } from 'react-redux';

import config from '../config';
import createStore from './lib/createStore';
import getRoutes from './routes';
import Html from './components/Html';

const app = new Express();
const server = new http.Server(app);

app.use(compression());
app.use(Express.static(config.utils.paths.static()));

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }

  const memoryHistory = createHistory(req.originalUrl);
  const store = createStore(memoryHistory);
  const history = syncHistoryWithStore(memoryHistory, store);

  function hydrateOnClient(component) {
    res.send(`<!doctype html>
${renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store} />)}`);
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }

  match({ history, routes: getRoutes(store), location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR:', error); // eslint-disable-line no-console
      res.status(500);
      hydrateOnClient();
    } else if (renderProps) {
      const component = (
        <Provider store={store}>
          <RouterContext {...renderProps} />
        </Provider>
      );

      res.status(200);
      hydrateOnClient(component);
    } else {
      res.status(404).send('Not Found');
    }
  });
});

/* eslint-disable no-console */
if (config.server.port) {
  server.listen(config.server.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info(`server listening on port ${config.server.port}`);
  });
} else {
  console.error('no port specified');
}
/* eslint-enable */
