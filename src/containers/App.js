import "babel-polyfill";

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NavBar from '../components/NavBar';
import NotificationContainer from './NotificationContainer';

const App = (props) => (
  <div>
    <NavBar auth={props.auth} />

    <div className="container">
      {props.children}
    </div>

    <NotificationContainer props/>
  </div>
);

App.propTypes = {
  children: PropTypes.element
};

function mapStateToProps(state) {

  console.log('mapStateToProps App', state);


  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({}, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
