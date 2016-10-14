import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import ProfilePage from '../components/ProfilePage';
import ChangePasswordForm from '../components/ChangePasswordForm';
import * as types from '../constants/ActionTypes';

class ProfileContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let {userId} = this.props.pageState.auth;
    this.props.dispatch({
      type: types.PROFILE__REQUESTED,
      payload: {
        userId
      }
    });
  }

  handleChangePassword(formData) {
    let {userId} = this.props.pageState.auth;
    let {currentPassword, newPassword, newPasswordRepeated} = formData;

    return this.props.dispatch({
      type: types.CHANGE_PASSWORD__REQUESTED,
      payload: {
        userId,
        currentPassword,
        newPassword,
        newPasswordRepeated
      }
    });
  }

  render() {
    let {username, email} = this.props.pageState.profile;

    return (
      <div>
        <ProfilePage username={username} emailAddress={email} />
        <ChangePasswordForm onSubmit={this.handleChangePassword.bind(this)}/>
      </div>
    );
  }
}

ProfileContainer.propTypes = {
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
)(ProfileContainer);
