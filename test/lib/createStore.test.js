import * as redux from 'redux';

import createStore from '../../src/lib/createStore';

const devToolsExtensionMock = sinon.stub().returns((f) => f);

describe('lib/createStore', () => {
  before(() => {
    global.__DEVELOPMENT__ = false;
  });

  beforeEach(() => {
    sinon.spy(redux, 'compose');
  });

  after(() => {
    delete global.__DEVELOPMENT__;
  });

  afterEach(() => {
    redux.compose.restore();
  });

  it('returns a store', () => {
    expect(createStore()).to.respondTo('getState');
    expect(createStore()).to.respondTo('dispatch');
    expect(createStore()).to.respondTo('subscribe');
    expect(createStore()).to.respondTo('replaceReducer');
  });

  context('in development environment', () => {
    before(() => {
      global.__DEVELOPMENT__ = true;
    });

    context('on the client', () => {
      before(() => {
        global.__CLIENT__ = true;
      });

      after(() => {
        delete global.__CLIENT__;
      });

      it('uses compose()', () => {
        createStore();
        expect(redux.compose).to.have.been.called;
      });

      context('with devtools extension', () => {
        before(() => {
          window.devToolsExtension = devToolsExtensionMock;
        });

        after(() => {
          window.devToolsExtension = undefined;
        });

        afterEach(() => {
          devToolsExtensionMock.reset();
        });

        it('sets up the devtools extension', () => {
          createStore();
          expect(devToolsExtensionMock).to.have.been.called;
        });
      });

      context('without devtools extension', () => {
        it('passes through', () => {
          createStore();
          expect(devToolsExtensionMock).not.to.have.been.called;
        });
      });
    });
  });

  context('in production environment', () => {
    before(() => {
      global.__DEVELOPMENT__ = false;
    });

    it('does not use compose()', () => {
      createStore();
      expect(redux.compose).not.to.have.been.called;
    });
  });
});
