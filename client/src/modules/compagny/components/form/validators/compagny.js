import i18n from '../../../../../i18n';

const validate = payload => {
  const errors = {};

  if (!payload.name) {
    errors.name = i18n.t('form.errors.requiredField');
  }

  return errors;
};

export default validate;
