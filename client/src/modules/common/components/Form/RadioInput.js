import React from 'react';
import PropTypes from 'prop-types';

const RadioInput = ({
  input,
  type,
  label,
  checked,
  meta: { touched, error },
}) => {
  return (
    <div className="custom-controls-stacked">
      <label className="custom-control custom-radio">
        <input
          type={type}
          className="custom-control-input"
          checked={checked}
          {...input}
        />
        <div className="custom-control-label">{label}</div>
      </label>
      {touched && (error && <span className="invalid-feedback">{error}</span>)}
    </div>
  );
};

RadioInput.defaultProps = {
  meta: {
    touched: false,
    error: '',
  },
};

RadioInput.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
};

export default RadioInput;
