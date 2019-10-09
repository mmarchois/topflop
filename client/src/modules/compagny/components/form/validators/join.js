import i18n from '../../../../../i18n';

const validate = payload => {
  const errors = {};

  if (!payload.voucher) {
    errors.voucher = i18n.t('form.errors.requiredField');
  }

  return errors;
};

export default validate;
