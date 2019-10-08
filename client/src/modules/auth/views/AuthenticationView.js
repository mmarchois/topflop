import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthenticationForm from '../components/form/AuthenticationForm';
import i18n from '../../../i18n';
import { reset } from '../actions/authentication';
import { authentication as onAuthentication } from '../middlewares/authentication';
import ServerErrors from '../../common/components/ServerErrors';

class AuthenticationView extends Component {
  handleSubmit = values => {
    if (!values) {
      return;
    }

    this.props.onAuthentication(values);
  };

  componentWillUnmount = () => {
    this.props.reset();
  };

  render() {
    const { loading, authenticated, errors } = this.props.authentication;

    if (true === authenticated) {
      return <Redirect to={'/users'} />;
    }

    return (
      <>
        <div className="page-header">
          <h1 className="page-title">
            {i18n.t('auth.authentication.introduction')}
          </h1>
        </div>

        <div className="row">
          <div className={'col-lg-12'}>
            <ServerErrors errors={errors} />
            <div className={'card'}>
              <div className={'card-body text-wrap p-lg-6'}>
                <AuthenticationForm
                  onSubmit={this.handleSubmit}
                  loading={loading}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

AuthenticationView.propTypes = {
  authentication: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    authenticated: PropTypes.bool.isRequired,
    errors: PropTypes.array.isRequired,
  }).isRequired,
  onAuthentication: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    authentication: state.auth.authentication,
  }),
  dispatch => ({
    ...bindActionCreators({ reset, onAuthentication }, dispatch),
  }),
)(AuthenticationView);
