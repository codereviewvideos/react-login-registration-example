import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProfile } from '../actions/profileActions';
import ProfilePage from '../components/ProfilePage';

class ProfileContainer extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.actions.fetchProfile();
  }

  componentWillReceiveProps(newProps) {
    console.log('got some new props', newProps);
  }

  render() {

    let {username, email} = this.props.profile.profile;

    return (
      <ProfilePage username={username} emailAddress={email} />
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
      fetchProfile
    }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);
