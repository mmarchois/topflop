import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import validate from './validators/registration';
import TextInput from '../../../common/components/Form/TextInput';

const RegistrationForm = ({ handleSubmit, loading }) => {
  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit}>
      <Field
        component={TextInput}
        type="text"
        label={t('auth.registration.form.firstName')}
        name="firstName"
      />
      <Field
        component={TextInput}
        type="text"
        label={t('auth.registration.form.lastName')}
        name="lastName"
      />
      <Field
        component={TextInput}
        type="text"
        label={t('auth.registration.form.email')}
        name="email"
      />
      <Field
        component={TextInput}
        type="password"
        label={t('auth.registration.form.password')}
        name="password"
      />
      <Field
        component={TextInput}
        type="password"
        label={t('auth.registration.form.confirmPassword')}
        name="confirmPassword"
      />
      <button
        type="submit"
        className={'btn btn-primary ml-auto'}
        disabled={loading}
      >
        {t('auth.registration.form.submit')}
      </button>
      <div className={'mt-3'}>
        <Link to={'/login'}>{t('auth.registration.form.account')}</Link>
      </div>
    </form>
  );
};

RegistrationForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'registration',
  validate,
})(RegistrationForm);
