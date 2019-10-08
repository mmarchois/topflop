import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';

const QuoteRow = ({ quote }) => {
  const { t } = useTranslation();
  const { firstName, lastName } = quote.author;

  return (
    <li className="list-group-item py-5">
      <div className="media">
        <div className="media-object avatar avatar-md mr-4">{firstName[0]}</div>
        <div className="media-body">
          <div className="media-heading">
            <small className="float-right text-muted">
              {t('quote.list.addedAt', {
                date: format(new Date(quote.createdAt), 'dd/M/Y'),
                interpolation: { escapeValue: false },
              })}
            </small>
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
