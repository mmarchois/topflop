import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegistrationForm from '../components/form/RegistrationForm';
import i18n from '../../../i18n';
import { reset } from '../actions/registration';
import { registration as onRegistration } from '../middlewares/registration';

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
    const { loading, authenticated } = this.props.registration;

    if (true === authenticated) {
      return <Redirect to={'/'} />;
    }

    return (
      <>
        <h1>{i18n.t('auth.registration.title')}</h1>
        <p>{i18n.t('auth.registration.introduction')}</p>
        <RegistrationForm onSubmit={this.handleSubmit} loading={loading} />
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
