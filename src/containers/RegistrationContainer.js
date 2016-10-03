import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { register } from '../actions/registrationActions';
import RegistrationForm from '../components/RegistrationForm';

class RegistrationContainer extends Component {

  constructor(props) {
    super(props);
  }

  onRegisterHandler(formData) {
    console.log('registration container :: on register handler', formData);

    let { username, emailAddress, password, passwordRepeated } = formData;

    this.props.actions.register(username, emailAddress, password, passwordRepeated);
  }

  render() {
    return (
      <div>
        <RegistrationForm onSubmit={this.onRegisterHandler.bind(this)}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    pageState: state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      register
    }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationContainer);
