import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import validate from './validators/join';
import TextInput from '../../../common/components/Form/TextInput';

const JoinForm = ({ handleSubmit, loading }) => {
  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit}>
      <Field
        component={TextInput}
        type="text"
        placeholder={t('compagny.form.placeholderVoucher')}
        label={t('compagny.form.voucher')}
        name="voucher"
      />
      <button
        type="submit"
        className={'btn btn-primary ml-auto'}
        disabled={loading}
      >
        {t('compagny.form.join')}
      </button>
    </form>
  );
};

JoinForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'join',
  validate,
})(JoinForm);
