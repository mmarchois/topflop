import React from 'react';
import PropTypes from 'prop-types';

const QuoteRow = ({ quote }) => {
  const { firstName, lastName } = quote.author;

  return (
    <li className="list-group-item py-5">
      <div className="media">
        <div className="media-object avatar avatar-md mr-4">{firstName[0]}</div>
        <div className="media-body">
          <div className="media-heading">
            <small className="float-right text-muted">{quote.createdAt}</small>
            <h5>{`${firstName} ${lastName}`}</h5>
          </div>
          <div>{quote.sentence}</div>
        </div>
      </div>
    </li>
  );
};

QuoteRow.propTypes = {
  quote: PropTypes.shape({
    author: PropTypes.shape({
      lastName: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
    }),
    sentence: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }),
};

export default QuoteRow;
