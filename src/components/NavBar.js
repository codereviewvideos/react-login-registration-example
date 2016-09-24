import React from 'react';
import { Link, IndexLink } from 'react-router';

const NavBar = (props) => {

  const loginOrProfile = props.auth.isAuthenticated ? (
    <p className="navbar-text navbar-right">Welcome back ..username..</p>
  ) : (
    <ul className="nav navbar-nav navbar-right">
      <li><Link to="/login">Log in</Link></li>
    </ul>
  );

  return (
    <nav className="navbar navbar-default navbar-static-top">
      <div className="container-fluid">

        <div className="navbar-header">
          <button type="button"
                  className="navbar-toggle collapsed"
                  data-toggle="collapse"
                  data-target="#bs-example-navbar-collapse-1"
                  aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"/>
            <span className="icon-bar"/>
            <span className="icon-bar"/>
          </button>
          <IndexLink to="/" className="navbar-brand">Home</IndexLink>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">

            <li><Link to="/about">About</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>

          { loginOrProfile }

        </div>
      </div>
    </nav>
  );
};

export default NavBar;
