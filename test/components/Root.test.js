import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';

import Root from '../../src/components/Root';

describe('components/Root', () => {
  const mockStore = configureStore();

  function getSubject(props) {
    return (
      <Root
        {...Object.assign({}, {
          store: mockStore({
            routing: () => ({})
          })
        }, props)}
      />
    );
  }

  it('renders without errors', () => {
    const subject = getSubject();
    const wrapper = shallow(subject);

    expect(wrapper).to.be.present();
  });
});
