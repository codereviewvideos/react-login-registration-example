import React, { PropTypes, Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {login} from '../actions/loginActions';
import LoginForm from '../components/LoginForm';
import '../styles/login-page.css';

export class LoginPage extends Component {

  doLogin(formData) {
    this.props.actions.login(formData.username, formData.password);
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
  actions: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    pageState: state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      login
    }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
