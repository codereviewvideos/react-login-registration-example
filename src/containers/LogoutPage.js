import {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as types from '../constants/ActionTypes';

class LogoutPage extends Component {

  componentWillMount() {
    this.props.dispatch({
      type: types.LOGOUT__REQUESTED
    });
  }

  render() {
    return null;
  }
}

LogoutPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired
};

export default connect()(LogoutPage);
