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
        name="name"
      />
      <button type="submit" disabled={loading}>
        {t('form.buttons.save')}
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
