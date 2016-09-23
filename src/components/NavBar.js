import React from 'react';
import { Link, IndexLink } from 'react-router';

const NavBar = () => (
  <nav className="navbar navbar-default navbar-static-top">
    <div className="container-fluid">

      <div className="navbar-header">
        <button type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#bs-example-navbar-collapse-1"
                aria-expanded="false">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <IndexLink to="/" className="navbar-brand">Home</IndexLink>
      </div>

      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav">

          <li><Link to="/fuel-savings">Demo App</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>

        <ul className="nav navbar-nav navbar-right">
          <li><Link to="/login">Login</Link></li>
        </ul>

      </div>
    </div>
  </nav>
);

export default NavBar;
