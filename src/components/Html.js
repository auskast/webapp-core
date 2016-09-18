import React, { PropTypes } from 'react';
import { renderToString } from 'react-dom/server';

const renderStyles = (styles) => (
  Object.keys(styles).map((style) => (
    <link key={style} rel="stylesheet" type="text/css" href={styles[style]} />
  ))
);

const renderScripts = (scripts) => (
  Object.keys(scripts).map((script) => (
    <script key={script} src={scripts[script]} />
  ))
);

const Html = ({ assets: { javascript, styles }, component, store }) => {
  const content = component ? renderToString(component) : '';

  /* eslint-disable react/no-danger */
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {renderStyles(styles)}
      </head>
      <body>
        <div id="content" dangerouslySetInnerHTML={{ __html: content }} />
        <script dangerouslySetInnerHTML={{ __html: `window.__INIT_DATA=${JSON.stringify(store.getState())};` }} />
        {renderScripts(javascript)}
      </body>
    </html>
  );
  /* eslint-enable */
};

Html.propTypes = {
  assets: PropTypes.shape({
    styles: PropTypes.shape().isRequired,
    javascript: PropTypes.shape().isRequired,
  }).isRequired,
  component: PropTypes.node,
  store: PropTypes.shape().isRequired,
};

export default Html;
