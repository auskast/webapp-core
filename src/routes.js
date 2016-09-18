import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { App, Home, NotFound } from './pages';

export default (/* store */) => (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />

    <Route path="*" component={NotFound} />
  </Route>
);
