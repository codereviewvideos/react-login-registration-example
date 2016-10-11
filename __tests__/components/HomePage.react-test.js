import React from 'react';
import HomePage from '../../src/components/AboutPage.react';
import renderer from 'react-test-renderer';

describe('HomePage', () => {
  it('renders as expected', () => {
    const component = renderer.create(
      <HomePage />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
