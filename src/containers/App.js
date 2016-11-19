import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import NavBar from '../components/NavBar';
import NotificationContainer from './NotificationContainer';
import font from 'font-awesome/css/font-awesome.css'; // eslint-disable-line
import "babel-polyfill";


const App = (props) => {

  console.log('app was loaded');

 return (
   <div>
     <NavBar auth={props.auth}/>

     <div className="container">
       {props.children}
     </div>

     <NotificationContainer props/>
   </div>
 );

};

App.propTypes = {
  children: PropTypes.element,
  auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({}, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
