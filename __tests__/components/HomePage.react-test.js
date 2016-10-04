import React from 'react';
import HomePage from '../../src/components/AboutPage.react';
import renderer from 'react-test-renderer';

test('Can see home page', () => {
  const component = renderer.create(
    <HomePage />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
