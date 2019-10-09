import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import i18n from '../../../i18n';
import { reset } from '../actions/add';
import { reset as resetJoin } from '../actions/join';
import { addCompagny } from '../middlewares/add';
import { joinCompagny } from '../middlewares/join';
import CompagnyForm from '../components/form/CompagnyForm';
import ServerErrors from '../../common/components/ServerErrors';
import JoinForm from '../components/form/JoinForm';

class AddCompagnyView extends Component {
  componentWillUnmount = () => {
    this.props.reset();
    this.props.resetJoin();
  };

  handleSubmit = values => {
    this.props.addCompagny(values);
  };

  handleJoinSubmit = values => {
    this.props.joinCompagny(values);
  };

  render = () => {
    const { add, join } = this.props;

    if (add.payload) {
      return <Redirect to={'/users/add'} />;
    }

    if (join.payload) {
      return <Redirect to={'/users'} />;
    }

    return (
      <>
        <div className="page-header">
          <h1 className="page-title">
            <i className={'icon fe fe-settings'} />{' '}
            {i18n.t('compagny.add.introduction')}
          </h1>
        </div>

        <div className="row">
          <div className={'col-lg-12'}>
            <ServerErrors errors={[...add.errors, ...join.errors]} />
          </div>
          <div className={'col-lg-6'}>
            <div className={'card'}>
              <div className={'card-body text-wrap p-lg-6'}>
                <p>{i18n.t('compagny.add.new')}</p>
                <CompagnyForm
                  onSubmit={this.handleSubmit}
                  loading={add.loading}
                />
              </div>
            </div>
          </div>
          <div className={'col-lg-6'}>
            <div className={'card'}>
              <div className={'card-body text-wrap p-lg-6'}>
                <p>{i18n.t('compagny.add.join')}</p>
                <JoinForm
                  onSubmit={this.handleJoinSubmit}
                  loading={join.loading}
                />
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
  resetJoin: PropTypes.func.isRequired,
  addCompagny: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    add: state.compagny.add,
    join: state.compagny.join,
  }),
  dispatch => ({
    ...bindActionCreators(
      { reset, resetJoin, joinCompagny, addCompagny },
      dispatch,
    ),
  }),
)(AddCompagnyView);
