import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({ input, label, type, meta: { touched, error } }) => (
  <div className="form-group row">
    <label className="col-md-3 label-control">{label}</label>
    <input {...input} type={type} />
    {touched && (error && <span className="error">{error}</span>)}
  </div>
);

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
