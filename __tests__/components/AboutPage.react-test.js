import React from 'react';
import AboutPage from '../../src/components/AboutPage.react';
import renderer from 'react-test-renderer';

describe('AboutPage', () => {
  it('renders as expected', () => {
    const component = renderer.create(
      <AboutPage />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
