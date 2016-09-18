import reducers from '../../src/reducers';

// TODO other reducers from clients

describe('reducers', () => {
  it('contains a key for each reducer', () => {
    expect(Object.keys(reducers())).to.deep.equal(['routing']);
  });
});
