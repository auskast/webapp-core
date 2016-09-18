import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { browserHistory } from 'react-router';

import Root from './components/Root';
import createStore from './lib/createStore';

const dest = document.getElementById('content');
const store = createStore(browserHistory, null, window.__INIT_DATA);

function renderContainer(Component) {
  render(
    <AppContainer>
      <Component store={store} />
    </AppContainer>,
    dest
  );
}

renderContainer(Root);

if (__DEVELOPMENT__ && module.hot) {
  module.hot.accept('./components/Root', () => renderContainer(require('./components/Root')));
}
