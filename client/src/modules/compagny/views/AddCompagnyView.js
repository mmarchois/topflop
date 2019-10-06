import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import i18n from '../../../i18n';
import { reset } from '../actions/add';
import { addCompagny } from '../middlewares/add';
import CompagnyForm from '../components/form/CompagnyForm';

class AddCompagnyView extends Component {
  componentWillUnmount = () => {
    this.props.reset();
  };

  handleSubmit = values => {
    this.props.addCompagny(values);
  };

  render = () => {
    const { loading, payload } = this.props.add;

    if (payload) {
      return <Redirect to={'/compagny/users'} />;
    }

    return (
      <>
        <h1>{i18n.t('compagny.add.title')}</h1>
        <p>{i18n.t('compagny.add.introduction')}</p>
        <CompagnyForm onSubmit={this.handleSubmit} loading={loading} />
      </>
    );
  };
}

AddCompagnyView.propTypes = {
  add: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    payload: PropTypes.object,
    errors: PropTypes.array,
  }),
  reset: PropTypes.func.isRequired,
  addCompagny: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    add: state.compagny.add,
  }),
  dispatch => ({
    ...bindActionCreators({ reset, addCompagny }, dispatch),
  }),
)(AddCompagnyView);
