import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import validate from './validators/user';
import TextInput from '../../../common/components/Form/TextInput';
import RadioInput from '../../../common/components/Form/RadioInput';

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

      <div className="form-group">
        <div className="form-label">{t('user.list.role')}</div>
        <Field
          component={RadioInput}
          label={t('user.role.user')}
          name={'role'}
          checked={true}
          type={'radio'}
          value={'user'}
        />
        <Field
          component={RadioInput}
          label={t('user.role.admin')}
          type={'radio'}
          name={'role'}
          value={'admin'}
        />
      </div>

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

UserForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'user',
  validate,
})(UserForm);
