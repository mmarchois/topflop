import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';

const QuoteRow = ({ quote }) => {
  const { t } = useTranslation();
  const { firstName, lastName } = quote.author;

  return (
    <tr>
      <td>
        &laquo; {quote.sentence} &raquo;
        <small className={'d-block item-except text-sm text-muted h-1x'}>
          {t('quote.list.author', { username: `${firstName} ${lastName}` })} -{' '}
          {format(new Date(quote.createdAt), 'dd/M/Y')}
        </small>
      </td>
      <td>
        <Link
          to={`/quotes/${quote.id}/detail`}
          className="btn btn-secondary btn-sm"
        >
          <i className={'icon fe fe-eye'}></i>
          {t('quote.list.see')}
        </Link>
      </td>
    </tr>
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
