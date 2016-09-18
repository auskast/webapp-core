import React from 'react';
import { shallow } from 'enzyme';

import App from '../../src/pages/App';

describe('pages/App', () => {
  function getSubject(props) {
    return (
      <App {...Object.assign({}, props)} />
    );
  }

  it('renders without errors', () => {
    const subject = getSubject();
    const wrapper = shallow(subject);

    expect(wrapper).to.be.present();
  });
});
