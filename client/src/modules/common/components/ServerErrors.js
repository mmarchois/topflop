import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const ServerErrors = ({ errors }) => {
  const { t } = useTranslation();

  if (0 === errors.length) {
    return null;
  }

  return (
    <div className="alert alert-danger" role="alert">
      <ul>
        {errors.map((error, key) => (
          <li key={key}>{t(error)}</li>
        ))}
      </ul>
    </div>
  );
};

ServerErrors.propTypes = {
  errors: PropTypes.array.isRequired,
};

export default ServerErrors;
