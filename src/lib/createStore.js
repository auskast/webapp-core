import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';

/**
 * create a store with all middlewares attached
 *
 * @param history router history
 * @param client api client
 * @param data initial store data
 * @returns store
 */
export default function createStore(history, client, data) {
  // sync dispatched route actions to the history
  const reduxRouterMiddleware = routerMiddleware(history);

  const middleware = [reduxRouterMiddleware]; // TODO add additional middleware

  let finalCreateStore;
  if (__DEVELOPMENT__ && __CLIENT__) {
    finalCreateStore = compose(
      applyMiddleware(...middleware),
      // add dev tools extension support
      window.devToolsExtension ? window.devToolsExtension() : (f) => f
    )(_createStore);
  } else {
    finalCreateStore = applyMiddleware(...middleware)(_createStore);
  }

  const reducers = require('../reducers');

  const store = finalCreateStore(reducers, data);

  /* istanbul ignore if */
  if (__DEVELOPMENT__ && module.hot) {
    /* istanbul ignore next */
    module.hot.accept('../reducers', () => store.replaceReducer(require('../reducers')));
  }

  return store;
}
