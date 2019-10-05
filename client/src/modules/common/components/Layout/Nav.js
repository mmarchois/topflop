import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="d-none d-lg-block navbar navbar-expand-md">
      <div className="container">
        <ul className="navbar-nav" id="menu">
          <li className="nav-item">
            <Link className="nav-link " to={'/'}>
              <span className="nav-icon">
                <i className="icon fe fe-home"></i>
              </span>
              <span className="nav-text">Dashboard</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={'/'}>
              <span className="nav-icon">
                <i className="icon fe fe-thumbs-up"></i>
              </span>
              <span className="nav-text">Tops</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={'/'}>
              <span className="nav-icon">
                <i className="icon fe fe-thumbs-down"></i>
              </span>
              <span className="nav-text">Flops</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={'/'}>
              <span className="nav-icon">
                <i className="icon fe fe-type"></i>
              </span>
              <span className="nav-text">Quotes </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
