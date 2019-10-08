import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const UserRow = ({ user, onTop, onFlop }) => {
  const { t } = useTranslation();

  return (
    <tr>
      <td>{`${user.firstName} ${user.lastName}`}</td>
      <td>{user.email}</td>
      <td>{t(`user.role.${user.role}`)}</td>
      <td>
        <button onClick={onFlop} className="btn btn-secondary btn-sm">
          <i className={'icon fe fe-thumbs-down'}></i> Flop
        </button>
        <Link
          to={`/users/${user.id}/quotes/add`}
          className="btn btn-secondary btn-sm mr-3 ml-3"
        >
          <i className={'icon fe fe-code'}></i> Quote
        </Link>
        <button onClick={onTop} className="btn btn-secondary btn-sm">
          <i className={'icon fe fe-thumbs-up'}></i> Top
        </button>
      </td>
    </tr>
  );
};

UserRow.propTypes = {
  onTop: PropTypes.func.isRequired,
  onFlop: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
};

export default UserRow;
