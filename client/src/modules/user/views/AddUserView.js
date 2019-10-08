import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import i18n from '../../../i18n';
import { reset } from '../actions/add';
import { addUser } from '../middlewares/add';
import UserForm from '../components/form/UserForm';
import ServerErrors from '../../common/components/ServerErrors';

class AddUserView extends Component {
  componentWillUnmount = () => {
    this.props.reset();
  };

  handleSubmit = values => {
    this.props.addUser(values);
  };

  render = () => {
    const { loading, payload, errors } = this.props.add;

    if (payload) {
      return <Redirect to={'/users'} />;
    }

    return (
      <>
        <div className="page-header">
          <h1 className="page-title">
            <i className="icon fe fe-users"></i> {i18n.t('user.add.title')}
          </h1>
        </div>

        <div className="row">
          <div className={'col-lg-12'}>
            <ServerErrors errors={errors} />
            <div className={'card'}>
              <div className={'card-body text-wrap p-lg-6'}>
                <p>{i18n.t('user.add.introduction')}</p>
                <UserForm onSubmit={this.handleSubmit} loading={loading} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
}

AddUserView.propTypes = {
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
    add: state.user.add,
  }),
  dispatch => ({
    ...bindActionCreators({ reset, addUser }, dispatch),
  }),
)(AddUserView);
