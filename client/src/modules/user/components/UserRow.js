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
              <i className={'icon fe fe-thumbs-down'}></i>{' '}
              <span className={'d-lg-block d-none'}>{t('user.list.flop')}</span>
            </button>
            <button
              onClick={onTop}
              className="btn btn-secondary btn-sm mr-1 ml-1"
            >
              <i className={'icon fe fe-thumbs-up'}></i>{' '}
              <span className={'d-lg-block d-none'}>{t('user.list.top')}</span>
            </button>
            <Link
              to={`/users/${user.id}/quotes/add`}
              className="btn btn-secondary btn-sm"
            >
              <i className={'icon fe fe-file-text'}></i>{' '}
              <span className={'d-lg-block d-none'}>
                {t('user.list.quote')}
              </span>
            </Link>{' '}
            {'admin' === currentUser.role && (
              <button
                onClick={onDelete}
                className="btn btn-secondary btn-sm mr-1 ml-1"
              >
                <i className={'icon fe fe-trash-2'}></i>{' '}
                <span className={'d-lg-block d-none'}>
                  {t('user.list.delete')}
                </span>
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
