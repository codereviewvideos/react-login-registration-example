import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import RegistrationForm from '../components/RegistrationForm';
import * as types from '../constants/ActionTypes';

class RegistrationContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  onRegisterHandler(formData) {
    let {username, emailAddress, password, passwordRepeated} = formData;

    this.props.dispatch({
      type: types.REGISTRATION__RREQUESTED,
      payload: {
        username,
        email: emailAddress,
        password,
        passwordRepeated
      }
    });
  }

  render() {
    return (
      <div>
        <RegistrationForm onSubmit={this.onRegisterHandler.bind(this)}/>
      </div>
    );
  }
}

RegistrationContainer.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    pageState: state
  };
}

export default connect(
  mapStateToProps
)(RegistrationContainer);
