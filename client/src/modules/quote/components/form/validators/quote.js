import i18n from '../../../../../i18n';

const validate = payload => {
  const errors = {};

  if (!payload.sentence) {
    errors.sentence = i18n.t('form.errors.requiredField');
  }

  return errors;
};

export default validate;
