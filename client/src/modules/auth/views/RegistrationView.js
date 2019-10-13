import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegistrationForm from '../components/form/RegistrationForm';
import i18n from '../../../i18n';
import { reset } from '../actions/registration';
import { registration as onRegistration } from '../middlewares/registration';
import ServerErrors from '../../common/components/ServerErrors';

class RegistrationView extends Component {
  handleSubmit = values => {
    if (!values) {
      return;
    }

    this.props.onRegistration(values);
  };

  componentWillUnmount = () => {
    this.props.reset();
  };

  render() {
    const { registration, authenticated } = this.props;

    if (true === authenticated) {
      return <Redirect to={'/users'} />;
    }

    return (
      <>
        <div className="page-header">
          <h1 className="page-title">{i18n.t('auth.registration.title')}</h1>
        </div>

        <div className="row">
          <div className={'col-lg-12'}>
            <ServerErrors errors={registration.errors} />
            <div className={'card'}>
              <div className={'card-body text-wrap p-lg-6'}>
                <RegistrationForm
                  onSubmit={this.handleSubmit}
                  loading={registration.loading}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

RegistrationView.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  registration: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    errors: PropTypes.array.isRequired,
  }).isRequired,
  onRegistration: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    registration: state.auth.registration,
    authenticated: state.auth.authentication.authenticated,
  }),
  dispatch => ({
    ...bindActionCreators({ reset, onRegistration }, dispatch),
  }),
)(RegistrationView);
