import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import validate from './validators/password';
import TextInput from '../../../common/components/Form/TextInput';

const PasswordForm = ({ handleSubmit, loading }) => {
  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit}>
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
        {t('form.buttons.save')}
      </button>
    </form>
  );
};

PasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'password',
  validate,
})(PasswordForm);
