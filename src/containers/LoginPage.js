import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { withRouter } from 'react-router'
import {login} from '../actions/authActions';
import LoginForm from '../components/LoginForm';
import addNotification from '../actions/notificationActions'
import '../styles/login-page.css';

export class LoginPage extends Component {

  doLogin(formData) {
    this.props.dispatch(login(formData.username, formData.password));
    this.props.dispatch(addNotification(`Welcome back ${formData.username}`, 'success'));
  }

  componentWillReceiveProps(newProps) {
    if (newProps.pageState.auth.isAuthenticated) {
      this.props.router.replace('/');
    }
  }

  render() {
    return (
      <div>
        <LoginForm onSubmit={this.doLogin.bind(this)}/>
      </div>
    );
  }
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    pageState: state
  };
};

export default connect(
  mapStateToProps
)(withRouter(LoginPage))
