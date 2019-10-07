import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import validate from './validators/user';
import TextInput from '../../../common/components/Form/TextInput';

const UserForm = ({ handleSubmit, loading }) => {
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

      <div>
        <Field component={'select'} name="role">
          <option value="user">{t('user.role.user')}</option>
          <option value="admin">{t('user.role.admin')}</option>
        </Field>
        <label>{t('user.list.role')}</label>
      </div>

      <button type="submit" disabled={loading}>
        {t('form.buttons.save')}
      </button>
    </form>
  );
};

UserForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'user',
  validate,
})(UserForm);
