import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import getRoutes from '../routes';

class Root extends Component {
  constructor(props) {
    super(props);

    const { store } = props;
    this.history = syncHistoryWithStore(browserHistory, store);
    this.routes = getRoutes(store);
  }

  render() {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <Router history={this.history}>
          {this.routes}
        </Router>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.shape().isRequired
};

export default Root;
