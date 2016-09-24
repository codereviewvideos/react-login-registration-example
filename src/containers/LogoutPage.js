import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { logout } from '../actions/authActions'

class LogoutPage extends Component {

  componentWillMount() {
    this.props.dispatch(logout());
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
