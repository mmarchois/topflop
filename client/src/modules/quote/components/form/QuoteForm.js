import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import validate from './validators/quote';
import TextInput from '../../../common/components/Form/TextInput';

const QuoteForm = ({ handleSubmit, loading }) => {
  const { t } = useTranslation();

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Field
          component={TextInput}
          type="text"
          label={t('quote.form.sentence')}
          name="sentence"
        />
        <button type="submit" disabled={loading}>
          {t('form.buttons.save')}
        </button>
      </form>
    </>
  );
};

QuoteForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'quote',
  validate,
})(QuoteForm);
