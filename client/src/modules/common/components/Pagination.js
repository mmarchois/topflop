import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Pagination = ({ pageCount, page, baseUrl }) => {
  if (pageCount <= 1) {
    return null;
  }

  const pages = [];

  for (let i = 1; i <= pageCount; i++) {
    pages.push(`${baseUrl}/${i}`);
  }

  return (
    <ul className="pagination mt-5">
      {pages.map((item, key) => (
        <li className="page-item" key={key}>
          <Link
            className={
              parseInt(page) === key + 1
                ? 'btn btn-outline-primary mr-2'
                : 'btn btn-primary mr-2'
            }
            to={item}
          >
            {key + 1}
          </Link>
        </li>
      ))}
    </ul>
  );
};

Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  baseUrl: PropTypes.string.isRequired,
};

export default Pagination;
