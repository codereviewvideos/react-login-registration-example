import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { logout } from '../actions/authActions'
import addNotification from '../actions/notificationActions'

class LogoutPage extends Component {

  componentWillMount() {
    this.props.dispatch(logout());
    this.props.dispatch(addNotification('Thanks for stopping by!', 'success'));
    this.props.router.replace('/');
  }

  render() {
    return null
  }
}

LogoutPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired
};

export default connect()(withRouter(LogoutPage))
