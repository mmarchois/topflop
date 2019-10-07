import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Pagination = ({ pageCount, page, baseUrl }) => {
  const pages = [];

  for (let i = 1; i <= pageCount; i++) {
    pages.push(`${baseUrl}/${i}`);
  }

  return (
    <ul>
      {pages.map((item, key) => (
        <li key={key}>
          <Link className={page == key + 1 ? 'active' : ''} to={item}>
            {key + 1}
          </Link>
        </li>
      ))}
    </ul>
  );
};

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  page: PropTypes.string.isRequired,
  baseUrl: PropTypes.string.isRequired,
};

export default Pagination;
