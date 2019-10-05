import i18n from '../../../../../i18n';

const validate = payload => {
  const errors = {};

  if (!payload.email) {
    errors.email = i18n.t('form.errors.requiredField');
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(payload.email)) {
    errors.email = i18n.t('form.errors.invalidEmail');
  }

  if (!payload.password) {
    errors.password = i18n.t('form.errors.requiredField');
  }

  return errors;
};

export default validate;
