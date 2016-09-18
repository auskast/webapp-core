import React from 'react';
import { shallow } from 'enzyme';

import Html from '../../src/components/Html';

describe('components/Html', () => {
  function getSubject(props) {
    return (
      <Html
        {...Object.assign({}, {
          assets: {
            styles: {},
            javascript: {}
          },
          store: {
            getState: () => ({
              abc: 'def'
            })
          }
        }, props)}
      />
    );
  }

  it('renders without errors', () => {
    const subject = getSubject();
    const wrapper = shallow(subject);

    expect(wrapper).to.be.present();
  });

  it('adds a stylesheet link for each style', () => {
    const subject = getSubject({
      assets: {
        styles: {
          main: 'main.css'
        },
        javascript: {}
      }
    });
    const wrapper = shallow(subject);
    const styles = wrapper.find('head').find('link[rel="stylesheet"]');

    expect(styles).to.have.length(1);
    expect(styles.first()).to.have.attr('href').equal('main.css');
  });

  it('sets the __INIT_DATA variable with store state', () => {
    const subject = getSubject();
    const wrapper = shallow(subject);

    // TODO would prefer to have this actually check the 'window' global
    expect(wrapper.find('body').find('script').first()).to.have.html().contain('window.__INIT_DATA={"abc":"def"}');
  });

  it('adds a javascript tag to the body for each script chunk', () => {
    const subject = getSubject({
      assets: {
        styles: {},
        javascript: {
          vendor: 'vendor.js',
          main: 'main.js',
        }
      }
    });
    const wrapper = shallow(subject);
    // first tag is the __INIT_DATA
    const scripts = wrapper.find('body').find('script').filterWhere((script) => script.prop('src'));

    expect(scripts).to.have.length(2);
    expect(scripts.map((script) => script.prop('src'))).to.deep.equal(['vendor.js', 'main.js']);
  });

  context('with component', () => {
    const subject = getSubject({
      component: <div>Test</div>
    });

    it('renders the component as a string in the content div', () => {
      const wrapper = shallow(subject);

      expect(wrapper.find('#content')).to.have.html().contain('Test');
    });
  });

  context('without component', () => {
    const subject = getSubject();

    it('renders an empty content div', () => {
      const wrapper = shallow(subject);

      expect(wrapper.find('#content')).to.be.blank();
    });
  });
});
