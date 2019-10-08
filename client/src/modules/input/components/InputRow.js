import React from 'react';
import PropTypes from 'prop-types';

const InputRow = ({ input, position }) => {
  const author = input.author;

  return (
    <tr>
      <td style={{ textAlign: 'center' }}>
        {position <= 3 && (
          <img src={`/img/${position}.svg`} height={40} alt={position} />
        )}
        {position > 3 && <span>#{position}</span>}
      </td>
      <td>{`${author.firstName} ${author.lastName}`}</td>
      <td style={{ textAlign: 'center' }}>
        <b>{input.counter}</b>
      </td>
    </tr>
  );
};

InputRow.propTypes = {
  position: PropTypes.number.isRequired,
  input: PropTypes.shape({
    author: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    }),
  }),
};

export default InputRow;
