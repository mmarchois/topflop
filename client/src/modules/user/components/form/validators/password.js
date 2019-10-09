import i18n from '../../../../../i18n';

const validate = payload => {
  const errors = {};

  if (!payload.password) {
    errors.password = i18n.t('form.errors.requiredField');
  }

  if (!payload.confirmPassword) {
    errors.confirmPassword = i18n.t('form.errors.requiredField');
  }

  if (
    payload.password &&
    payload.confirmPassword &&
    payload.password !== payload.confirmPassword
  ) {
    errors.confirmPassword = i18n.t(
      'auth.registration.form.errors.invalidPasswords',
    );
  }

  return errors;
};

export default validate;
