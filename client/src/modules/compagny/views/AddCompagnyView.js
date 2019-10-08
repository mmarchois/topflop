import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import i18n from '../../../i18n';
import { reset } from '../actions/add';
import { addCompagny } from '../middlewares/add';
import CompagnyForm from '../components/form/CompagnyForm';
import ServerErrors from '../../common/components/ServerErrors';

class AddCompagnyView extends Component {
  componentWillUnmount = () => {
    this.props.reset();
  };

  handleSubmit = values => {
    this.props.addCompagny(values);
  };

  render = () => {
    const { loading, payload, errors } = this.props.add;

    if (payload) {
      return <Redirect to={'/users/add'} />;
    }

    return (
      <>
        <div className="page-header">
          <h1 className="page-title">{i18n.t('compagny.add.introduction')}</h1>
        </div>

        <div className="row">
          <div className={'col-lg-12'}>
            <ServerErrors errors={errors} />
            <div className={'card'}>
              <div className={'card-body text-wrap p-lg-6'}>
                <CompagnyForm onSubmit={this.handleSubmit} loading={loading} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
}

AddCompagnyView.propTypes = {
  add: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    payload: PropTypes.object,
    errors: PropTypes.array.isRequired,
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
