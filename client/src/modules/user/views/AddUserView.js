import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import i18n from '../../../i18n';
import { reset } from '../actions/add';
import { addUser } from '../middlewares/add';
import UserForm from '../components/form/UserForm';

class AddUserView extends Component {
  componentWillUnmount = () => {
    this.props.reset();
  };

  handleSubmit = values => {
    this.props.addUser(values);
  };

  render = () => {
    const { loading, payload } = this.props.add;

    if (payload) {
      return <Redirect to={'/users'} />;
    }

    return (
      <>
        <h1>{i18n.t('user.add.title')}</h1>
        <p>{i18n.t('user.add.introduction')}</p>
        <UserForm onSubmit={this.handleSubmit} loading={loading} />
      </>
    );
  };
}

AddUserView.propTypes = {
  add: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    payload: PropTypes.object,
    errors: PropTypes.array,
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
