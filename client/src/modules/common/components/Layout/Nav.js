import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Nav = () => {
  const { t } = useTranslation();

  return (
    <div className="d-none d-lg-block navbar navbar-expand-md">
      <div className="container">
        <ul className="navbar-nav" id="menu">
          <li className="nav-item">
            <Link className="nav-link " to={'/dashboard'}>
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
            <Link className="nav-link" to={'/quotes'}>
              <span className="nav-icon">
                <i className="icon fe fe-type"></i>
              </span>
              <span className="nav-text">{t('quote.title')}</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
