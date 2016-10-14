import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as types from '../constants/ActionTypes';
import NotificationSystem from 'react-notification-system';

class NotificationContainer extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.notificationSystem = this.refs.notificationSystem;
  }

  componentWillReceiveProps(newProps) {
    const {message, level} = newProps.notification;

    return this.props.dispatch({
      type: types.ADD_NOTIFICATION,
      payload: {
        message,
        level
      }
    });
  }

  render() {
    return (
      <NotificationSystem ref="notificationSystem" />
    );
  }
}

NotificationContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  notification: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    notification: state.notification
  };
}

export default connect(
  mapStateToProps
)(NotificationContainer);
