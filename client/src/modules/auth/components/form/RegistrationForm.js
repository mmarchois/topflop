import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
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
      <button type="submit" disabled={loading}>
        {t('auth.authentication.form.submit')}
      </button>
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
