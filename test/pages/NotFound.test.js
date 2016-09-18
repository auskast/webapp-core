import React from 'react';
import { shallow } from 'enzyme';

import NotFound from '../../src/pages/NotFound';

describe('pages/NotFound', () => {
  function getSubject(props) {
    return (
      <NotFound {...Object.assign({}, props)} />
    );
  }

  it('renders without errors', () => {
    const subject = getSubject();
    const wrapper = shallow(subject);

    expect(wrapper).to.be.present();
  });
});
