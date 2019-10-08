import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({ input, label, type, meta: { touched, error } }) => {
  const inputClass =
    touched && error ? 'form-control is-invalid' : 'form-control';

  return (
    <div className="form-group row">
      <label className="form-label">{label}</label>
      <input {...input} className={inputClass} type={type} />
      {touched && (error && <span className="invalid-feedback">{error}</span>)}
    </div>
  );
};

TextInput.defaultProps = {
  meta: {
    touched: false,
    error: '',
  },
};

TextInput.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
};

export default TextInput;
