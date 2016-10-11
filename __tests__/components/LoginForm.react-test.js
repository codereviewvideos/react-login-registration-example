import React from 'react';
import LoginForm from '../../src/components/LoginForm.react';
import renderer from 'react-test-renderer';

xdescribe('LoginForm', () => {

  it('has clearly defined propTypes', () => {

    console.log('LoginForm',LoginForm );

    expect(LoginForm.propTypes).toBeDefined();

  });


  // it('renders as expected', () => {
  //
  //   const component = renderer.create(
  //     <LoginForm onSubmit={() => true}/>
  //   );
  //   let tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  //
  // });


});
