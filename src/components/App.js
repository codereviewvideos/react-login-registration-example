import React, { PropTypes } from 'react';
import NavBar from './NavBar';
import NotificationContainer from '../containers/NotificationContainer';

const App = (props) => {
  return (
    <div>
      <NavBar />

      <div className="container">
        {props.children}
      </div>

      <NotificationContainer props/>
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
