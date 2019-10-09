import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import validate from './validators/profile';
import TextInput from '../../../common/components/Form/TextInput';

const ProfileForm = ({ handleSubmit, loading }) => {
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

ProfileForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'profile',
  validate,
})(ProfileForm);
