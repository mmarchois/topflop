import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import i18n from '../../../i18n';
import { reset } from '../actions/edit';
import { reset as passwordReset } from '../actions/password';
import { editUser } from '../middlewares/edit';
import { editPassword } from '../middlewares/password';
import ServerErrors from '../../common/components/ServerErrors';
import SuccessMessage from '../../common/components/SuccessMessage';
import ProfileForm from '../components/form/ProfileForm';
import PasswordForm from '../components/form/PasswordForm';

class EditUserView extends Component {
  componentWillUnmount = () => {
    this.props.reset();
    this.props.passwordReset();
  };

  handleSubmit = values => {
    this.props.editUser(values);
  };

  handlePasswordSubmit = values => {
    this.props.editPassword(values);
  };

  render = () => {
    const { edit, password, user } = this.props;

    return (
      <>
        <div className="page-header">
          <h1 className="page-title">
            <i className="icon fe fe-user"></i> {i18n.t('user.edit.title')}
          </h1>
        </div>

        <div className="row">
          <div className={'col-lg-12'}>
            <ServerErrors errors={[...edit.errors, ...password.errors]} />
            {edit.payload && (
              <SuccessMessage
                message={i18n.t('user.edit.success.informations')}
              />
            )}
            {password.payload && (
              <SuccessMessage message={i18n.t('user.edit.success.password')} />
            )}
          </div>
          <div className={'col-lg-6'}>
            <div className={'card'}>
              <div className={'card-body text-wrap p-lg-6'}>
                <p>{i18n.t('user.edit.informations')}</p>
                <ProfileForm
                  onSubmit={this.handleSubmit}
                  loading={edit.loading}
                  initialValues={user}
                />
              </div>
            </div>
          </div>
          <div className={'col-lg-6'}>
            <div className={'card'}>
              <div className={'card-body text-wrap p-lg-6'}>
                <p>{i18n.t('user.edit.changePassword')}</p>
                <PasswordForm
                  onSubmit={this.handlePasswordSubmit}
                  loading={password.loading}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
}

EditUserView.propTypes = {
  password: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    payload: PropTypes.object,
    errors: PropTypes.array.isRequired,
  }),
  edit: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    payload: PropTypes.object,
    errors: PropTypes.array.isRequired,
  }),
  reset: PropTypes.func.isRequired,
  editUser: PropTypes.func.isRequired,
  editPassword: PropTypes.func.isRequired,
  passwordReset: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    edit: state.user.edit,
    password: state.user.password,
    user: state.auth.authentication.user,
  }),
  dispatch => ({
    ...bindActionCreators(
      { reset, editPassword, passwordReset, editUser },
      dispatch,
    ),
  }),
)(EditUserView);
