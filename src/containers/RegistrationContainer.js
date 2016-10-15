import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import RegistrationForm from '../components/RegistrationForm';
import * as types from '../constants/ActionTypes';

class RegistrationContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  onRegisterHandler(formData) {
    const {username, emailAddress, password, passwordRepeated} = formData;

    this.props.dispatch({
      type: types.REGISTRATION__REQUESTED,
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
        <RegistrationForm
          onSubmit={this.onRegisterHandler.bind(this)}
          isSubmitting={this.props.pageState.request.sendingRequest}
        />
      </div>
    );
  }
}

RegistrationContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  pageState: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    pageState: state
  };
}

export default connect(
  mapStateToProps
)(RegistrationContainer);
