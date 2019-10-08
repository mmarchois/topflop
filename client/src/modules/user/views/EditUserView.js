import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import i18n from '../../../i18n';
import { reset } from '../actions/edit';
import { editUser } from '../middlewares/edit';
import UserForm from '../components/form/UserForm';
import ServerErrors from '../../common/components/ServerErrors';

class EditUserView extends Component {
  componentWillUnmount = () => {
    this.props.reset();
  };

  handleSubmit = values => {
    this.props.editUser(values);
  };

  render = () => {
    const { loading, payload, errors } = this.props.edit;

    return (
      <>
        <div className="page-header">
          <h1 className="page-title">
            <i className="icon fe fe-users"></i>{' '}
            {i18n.t('user.add.introduction')}
          </h1>
        </div>

        <div className="row">
          <div className={'col-lg-12'}>
            <ServerErrors errors={errors} />
            <div className={'card'}>
              <div className={'card-body text-wrap p-lg-6'}>
                <UserForm onSubmit={this.handleSubmit} loading={loading} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
}

EditUserView.propTypes = {
  add: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    payload: PropTypes.object,
    errors: PropTypes.array.isRequired,
  }),
  reset: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    edit: state.user.edit,
  }),
  dispatch => ({
    ...bindActionCreators({ reset, editUser }, dispatch),
  }),
)(EditUserView);
