import React from 'react';
import PropTypes from 'prop-types';

const InputRow = ({ input }) => {
  return (
    <div className="card-body p-3 text-center">
      <div className="h1 m-0">{input.counter}</div>
      <div className="text-muted mb-4">
        {input.author.firstName} {input.author.lastName}
      </div>
    </div>
  );
};

InputRow.propTypes = {
  input: PropTypes.shape({
    counter: PropTypes.string.isRequired,
    author: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    }),
  }),
};

export default InputRow;
