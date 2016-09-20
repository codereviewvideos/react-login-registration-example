import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/loginActions';
import LoginForm from '../components/LoginForm';
import '../styles/login-page.css';

export class LoginPage extends Component {

  doLogin(formData) {
    console.log('I am groot', formData);
  }

  render() {
    return (
      <div>
        <LoginForm onSubmit={this.doLogin}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.loginForm
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
