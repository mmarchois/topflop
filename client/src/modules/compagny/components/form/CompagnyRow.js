import React from 'react';
import { useTranslation } from 'react-i18next';

const CompagnyRow = ({ compagny, currentUser, handleCurrent, handleLeave }) => {
  const { t } = useTranslation();

  return (
    <tr>
      <td>{compagny.name}</td>
      <td>
        {t(`user.role.${compagny.role}`)}
        {'admin' === compagny.role && compagny.voucher && (
          <>
            <br />
            {t('compagny.list.voucher')}
            {' : '}
            <b>{compagny.voucher}</b>
          </>
        )}
      </td>
      <td>
        {currentUser.compagny.id !== compagny.id && (
          <>
            <button
              onClick={handleCurrent}
              className="btn btn-secondary btn-sm"
            >
              <i className={'icon fe fe-unlock'}></i>{' '}
              <span className={'d-lg-block d-none'}>
                {t('compagny.list.active')}
              </span>
            </button>
            <button
              onClick={handleLeave}
              className="btn btn-secondary btn-sm ml-3"
            >
              <i className={'icon fe fe-trash-2'}></i>{' '}
              <span className={'d-lg-block d-none'}>
                {t('compagny.list.leave')}
              </span>
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default CompagnyRow;
