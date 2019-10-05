import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="navbar navbar-expand-lg js-header">
      <div className="container">
        <Link to={'/'} className="navbar-brand text-inherit mr-md-3">
          <img
            src="./img/logo.svg"
            alt="TopFlop"
            className="d-none d-md-block navbar-brand-logo"
          />
          TopFlop.io
        </Link>
        <ul className="nav navbar-menu align-items-center order-1 order-lg-2">
          <li className="nav-item dropdown">
            <Link
              to={'#'}
              data-toggle="dropdown"
              className="nav-link d-flex align-items-center py-0 px-lg-0 px-2 text-color ml-2"
            >
              <span className="avatar">M</span>
              <span className="ml-2 d-none d-lg-block leading-none">
                <span>Mathieu MARCHOIS</span>
                <span className="text-muted d-block mt-1 text-h6">Admin</span>
              </span>
            </Link>
            <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
              <Link className="dropdown-item" to={'#'}>
                <i className="icon fe fe-user dropdown-icon"></i>
                Profile
              </Link>
              <Link className="dropdown-item" to={'#'}>
                <i className="icon fe fe-help-circle dropdown-icon"></i>
                Need help?
              </Link>
              <Link className="dropdown-item" to={'#'}>
                <i className="icon fe fe-log-out dropdown-icon"></i>
                Sign out
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
