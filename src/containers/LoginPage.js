import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import LoginForm from '../components/LoginForm.react';
import * as types from '../constants/ActionTypes';
import '../styles/login-page.css';

class LoginPage extends Component {

  componentWillReceiveProps(newProps) {
    if (newProps.pageState.auth.isAuthenticated) {
      this.props.router.replace('/');
    }
  }

  doLogin(formData) {
    this.props.dispatch({
      type: types.LOGIN__REQUESTED,
      payload: {
        username: formData.username,
        password: formData.password
      }
    });
  }

  render() {
    return (
      <div>
        <LoginForm
          onSubmit={this.doLogin.bind(this)}
          isSubmitting={!!this.props.pageState.request.sendingRequest}
        />
      </div>
    );
  }
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  pageState: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    pageState: state
  };
};

export default connect(
  mapStateToProps
)(withRouter(LoginPage));
