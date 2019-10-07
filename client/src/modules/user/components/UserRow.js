import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const UserRow = ({ user }) => {
  const { t } = useTranslation();

  return (
    <tr>
      <td>{`${user.firstName} ${user.lastName}`}</td>
      <td>{user.email}</td>
      <td>{t(`user.role.${user.role}`)}</td>
    </tr>
  );
};

UserRow.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
};

export default UserRow;
