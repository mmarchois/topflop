import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { logout } from '../../../auth/actions/authentication';
import i18n from '../../../../i18n';

class Header extends React.Component {
  handleLogout = () => {
    const { logout } = this.props;

    logout();
  };

  render = () => {
    const { authentication } = this.props;
    const { user, authenticated } = authentication;

    return (
      <header className="navbar navbar-expand-lg js-header">
        <div className="container">
          <Link to={'/'} className="navbar-brand text-inherit mr-md-3">
            <img
              src="/img/logo.svg"
              alt="TopFlop"
              className="d-none d-md-block navbar-brand-logo"
            />
            TopFlop.io
          </Link>
          {true === authenticated && (
            <ul className="nav navbar-menu align-items-center order-1 order-lg-2">
              <li className="nav-item dropdown">
                <Link
                  to={'#'}
                  data-toggle="dropdown"
                  className="nav-link d-flex align-items-center py-0 px-lg-0 px-2 text-color ml-2"
                >
                  <span className="avatar">{user.firstName[0]}</span>
                  <span className="ml-2 d-none d-lg-block leading-none">
                    <span>{`${user.firstName} ${user.lastName}`}</span>
                    {user.compagny && (
                      <span className="text-muted d-block mt-1 text-h6">
                        {user.compagny.name} - {user.role}
                      </span>
                    )}
                  </span>
                </Link>
                <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                  <Link className="dropdown-item" to={'#'}>
                    <i className="icon fe fe-user dropdown-icon"></i>
                    {i18n.t('header.navigation.profile')}
                  </Link>
                  <Link className="dropdown-item" to={'#'}>
                    <i className="icon fe fe-repeat dropdown-icon"></i>
                    {i18n.t('header.navigation.changeCompagny')}
                  </Link>
                  <Link
                    className="dropdown-item"
                    to={'#'}
                    onClick={this.handleLogout}
                  >
                    <i className="icon fe fe-log-out dropdown-icon"></i>
                    {i18n.t('header.navigation.logout')}
                  </Link>
                </div>
              </li>
            </ul>
          )}
        </div>
      </header>
    );
  };
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  authentication: PropTypes.shape({
    user: PropTypes.object,
    authenticated: PropTypes.bool.isRequired,
  }).isRequired,
};

export default connect(
  state => ({
    authentication: state.auth.authentication,
  }),
  dispatch => ({
    ...bindActionCreators({ logout }, dispatch),
  }),
)(Header);