import React, { PropTypes } from 'react';
import NavBar from './NavBar';

const App = (props) => {
  return (
    <div>
      <NavBar />

      <div className="container">
        {props.children}
      </div>
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
