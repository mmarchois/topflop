import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const UserRow = ({ user, currentUser, onTop, onFlop, onDelete }) => {
  const { t } = useTranslation();

  return (
    <tr>
      <td>
        {`${user.firstName} ${user.lastName}`}
        <small className={'d-block item-except text-sm text-muted h-1x'}>
          {user.email} - {t(`user.role.${user.role}`)}
        </small>
      </td>
      <td>
        {currentUser.email !== user.email && (
          <>
            <button onClick={onFlop} className="btn btn-secondary btn-sm">
              <i className={'icon fe fe-thumbs-down'}></i> {t('user.list.flop')}
            </button>
            <button
              onClick={onTop}
              className="btn btn-secondary btn-sm mr-2 ml-2"
            >
              <i className={'icon fe fe-thumbs-up'}></i> {t('user.list.top')}
            </button>
            <Link
              to={`/users/${user.id}/quotes/add`}
              className="btn btn-secondary btn-sm"
            >
              <i className={'icon fe fe-file-text'}></i> {t('user.list.quote')}
            </Link>{' '}
            {'admin' === currentUser.role && (
              <button
                onClick={onDelete}
                className="btn btn-secondary btn-sm mr-2 ml-2"
              >
                <i className={'icon fe fe-delete'}></i> {t('user.list.delete')}
              </button>
            )}
          </>
        )}
      </td>
    </tr>
  );
};

UserRow.propTypes = {
  onTop: PropTypes.func.isRequired,
  onFlop: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
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
