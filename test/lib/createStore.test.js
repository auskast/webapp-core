import createStore from '../../src/lib/createStore';

const devToolsExtensionMock = sinon.stub().returns((f) => f);

describe('lib/createStore', () => {
  before(() => {
    global.__DEVELOPMENT__ = false;
  });

  after(() => {
    delete global.__DEVELOPMENT__;
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
  });
});
