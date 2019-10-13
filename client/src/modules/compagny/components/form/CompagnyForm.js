import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import validate from './validators/compagny';
import TextInput from '../../../common/components/Form/TextInput';

const CompagnyForm = ({ handleSubmit, loading }) => {
  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit}>
      <Field
        component={TextInput}
        type="text"
        label={t('compagny.form.name')}
        placeholder={t('compagny.form.placeholderName')}
        name="name"
      />
      <button
        type="submit"
        className={'btn btn-primary ml-auto'}
        disabled={loading}
      >
        {t('compagny.form.create')}
      </button>
    </form>
  );
};

CompagnyForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'compagny',
  validate,
})(CompagnyForm);
