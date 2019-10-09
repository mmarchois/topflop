import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';

const Nav = ({ authenticated }) => {
  const { t } = useTranslation();

  if (false === authenticated) {
    return null;
  }

  return (
    <div className="d-none d-lg-block navbar navbar-expand-md">
      <div className="container">
        <ul className="navbar-nav" id="menu">
          <li className="nav-item">
            <Link className="nav-link" to={'/users'}>
              <span className="nav-icon">
                <i className="icon fe fe-users"></i>
              </span>
              <span className="nav-text">{t('user.title')}</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={'/inputs/top'}>
              <span className="nav-icon">
                <i className="icon fe fe-thumbs-up"></i>
              </span>
              <span className="nav-text">{t('input.type.top')}</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={'/inputs/flop'}>
              <span className="nav-icon">
                <i className="icon fe fe-thumbs-down"></i>
              </span>
              <span className="nav-text">{t('input.type.flop')}</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={'/quotes'}>
              <span className="nav-icon">
                <i className="icon fe fe-code"></i>
              </span>
              <span className="nav-text">{t('quote.title')}</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={'/companies'}>
              <span className="nav-icon">
                <i className="icon fe fe-settings"></i>
              </span>
              <span className="nav-text">{t('compagny.list.title')}</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

Nav.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

export default connect(state => ({
  authenticated: state.auth.authentication.authenticated,
}))(Nav);
