import React from 'react';
import NotFoundPage from '../../src/components/NotFoundPage.react';
import {shallow} from 'enzyme';

describe('NotFoundPage', () => {
  it('has expected header', () => {
    const component = shallow(
      <NotFoundPage />
    );

    expect(component.find('h4').text()).toEqual('404 Page Not Found');
  })
});
