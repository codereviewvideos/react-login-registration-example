import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProfile, changePassword } from '../actions/profileActions';
import ProfilePage from '../components/ProfilePage';
import ChangePasswordForm from '../components/ChangePasswordForm';

class ProfileContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.actions.fetchProfile();
  }

  onChangePasswordHandler(formData) {
    let { currentPassword, newPassword, newPasswordRepeated } = formData;
    this.props.actions.changePassword(currentPassword, newPassword, newPasswordRepeated);
  }

  render() {

    let {username, email} = this.props.profile.profile;

    return (
      <div>
        <ProfilePage username={username} emailAddress={email} />
        <ChangePasswordForm onSubmit={this.onChangePasswordHandler.bind(this)}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profile
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      fetchProfile,
      changePassword
    }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);
