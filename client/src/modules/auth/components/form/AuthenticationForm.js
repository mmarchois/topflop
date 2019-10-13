import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import validate from './validators/authentication';
import TextInput from '../../../common/components/Form/TextInput';

const AuthenticationForm = ({ handleSubmit, loading }) => {
  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit}>
      <Field
        component={TextInput}
        type="text"
        label={t('auth.authentication.form.email')}
        name="email"
      />
      <Field
        component={TextInput}
        type="password"
        label={t('auth.authentication.form.password')}
        name="password"
      />
      <button
        type="submit"
        className={'btn btn-primary ml-auto'}
        disabled={loading}
      >
        {t('auth.authentication.title')}
      </button>
      <div className={'mt-3'}>
        <Link to={'/register'}>{t('auth.authentication.form.noAccount')}</Link>
      </div>
    </form>
  );
};

AuthenticationForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'authentication',
  validate,
})(AuthenticationForm);
