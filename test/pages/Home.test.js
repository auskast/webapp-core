import React from 'react';
import { shallow } from 'enzyme';

import Home from '../../src/pages/Home';

describe('pages/Home', () => {
  function getSubject(props) {
    return (
      <Home {...Object.assign({}, props)} />
    );
  }

  it('renders without errors', () => {
    const subject = getSubject();
    const wrapper = shallow(subject);

    expect(wrapper).to.be.present();
  });
});
