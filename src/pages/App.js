// TODO this should live in clients, not here, or rather, out-source the main component to clients
import React, { PropTypes } from 'react';

const App = ({ children }) => (
  <div>
    <header>
      <h1>Test Server</h1>
    </header>
    <article>
      {children}
    </article>
    <footer>
      <strong>&lt;footer /&gt;</strong>
    </footer>
  </div>
);

App.propTypes = {
  children: PropTypes.node
};

export default App;
