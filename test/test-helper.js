import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import jsdom from 'jsdom';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

global.sinon = sinon;
global.expect = chai.expect;

chai.use(sinonChai);
chai.use(chaiEnzyme());

function setupDom() {
  const markup = '<!doctype html><html><head></head><body></body></html>';

  global.document = jsdom.jsdom(markup);
  global.window = document.defaultView;

  Object.keys(document.defaultView).forEach((property) => {
    if (typeof global[property] === 'undefined') {
      global[property] = document.defaultView[property];
    }
  });

  global.navigator = {
    userAgent: 'node.js'
  };
}

setupDom();
