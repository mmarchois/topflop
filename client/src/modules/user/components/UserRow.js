import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const UserRow = ({ user, currentUser, onTop, onFlop }) => {
  const { t } = useTranslation();

  return (
    <tr>
      <td>{`${user.firstName} ${user.lastName}`}</td>
      <td>{user.email}</td>
      {'admin' === currentUser.role && <td>{t(`user.role.${user.role}`)}</td>}
      <td>
        {currentUser.email !== user.email && (
          <>
            <button onClick={onFlop} className="btn btn-secondary btn-sm">
              <i className={'icon fe fe-thumbs-down'}></i> Flop
            </button>
            <button
              onClick={onTop}
              className="btn btn-secondary btn-sm mr-2 ml-2"
            >
              <i className={'icon fe fe-thumbs-up'}></i> Top
            </button>
            <Link
              to={`/users/${user.id}/quotes/add`}
              className="btn btn-secondary btn-sm"
            >
              <i className={'icon fe fe-code'}></i> Quote
            </Link>
          </>
        )}
      </td>
    </tr>
  );
};

UserRow.propTypes = {
  onTop: PropTypes.func.isRequired,
  onFlop: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
};

export default UserRow;
