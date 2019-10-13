import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { leaveCompagny } from '../middlewares/leave';
import { listCompanies } from '../middlewares/list';
import { currentCompagny as onCurrentCompagny } from '../../user/middlewares/currentCompagny';
import { reset } from '../actions/list';
import { reset as resetCurrentCompagny } from '../../user/actions/currentCompagny';
import { reset as resetLeaveCompagny } from '../actions/leave';
import { bindActionCreators } from 'redux';
import i18n from '../../../i18n';
import SuccessMessage from '../../common/components/SuccessMessage';
import CompagnyRow from '../components/form/CompagnyRow';

class ListCompagnyView extends Component {
  componentDidMount = () => {
    this.props.listCompanies();
  };

  componentWillUnmount = () => {
    this.props.reset();
    this.props.resetLeaveCompagny();
    this.props.resetCurrentCompagny();
  };

  handleLeave = compagnyId => {
    if (window.confirm(i18n.t('compagny.list.leaveConfirm'))) {
      this.props.leaveCompagny(compagnyId);
    }
  };

  render = () => {
    const { payload } = this.props.list;
    const { currentUser, onCurrentCompagny, currentCompagny } = this.props;

    return (
      <>
        <div className="page-header">
          <h1 className="page-title">
            <i className="icon fe fe-settings"></i>{' '}
            {i18n.t('compagny.list.title')} ({payload.length})
          </h1>
        </div>

        <div className="row">
          <div className={'col-lg-12'}>
            {currentCompagny.payload && (
              <SuccessMessage
                message={i18n.t('user.currentCompagny.success', {
                  compagny: currentCompagny.payload.compagny.name,
                })}
              />
            )}
            <div className={'card'}>
              <div className={'card-body text-wrap p-lg-6'}>
                <Link
                  to={'/groups/add'}
                  className="btn btn-outline-primary mb-4"
                >
                  <i className="icon fe fe-plus"></i>
                  {i18n.t('compagny.list.add')}
                </Link>
                <div className="alert alert-primary">
                  {0 === payload.length && i18n.t('compagny.list.help2')}
                  {0 < payload.length && (
                    <>
                      {i18n.t('compagny.list.help')}
                      <br />
                      {i18n.t('compagny.list.help1')}
                    </>
                  )}
                </div>
                <div className={'table-responsive'}>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>{i18n.t('compagny.list.name')}</th>
                        <th>{i18n.t('compagny.list.role')}</th>
                        <th>{i18n.t('compagny.list.action')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payload.map(compagny => (
                        <CompagnyRow
                          key={compagny.id}
                          compagny={compagny}
                          currentUser={currentUser}
                          handleLeave={() => this.handleLeave(compagny.id)}
                          handleCurrent={() => onCurrentCompagny(compagny.id)}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
}

ListCompagnyView.propTypes = {
  resetLeaveCompagny: PropTypes.func.isRequired,
  listCompanies: PropTypes.func.isRequired,
  onCurrentCompagny: PropTypes.func.isRequired,
  leaveCompagny: PropTypes.func.isRequired,
  resetCurrentCompagny: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    compagny: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      voucher: PropTypes.string,
    }),
  }),
  list: PropTypes.shape({
    payload: PropTypes.array.isRequired,
  }),
};

export default connect(
  state => ({
    list: state.compagny.list,
    currentUser: state.auth.authentication.user,
    currentCompagny: state.user.currentCompagny,
  }),
  dispatch => ({
    ...bindActionCreators(
      {
        listCompanies,
        onCurrentCompagny,
        resetCurrentCompagny,
        leaveCompagny,
        resetLeaveCompagny,
        reset,
      },
      dispatch,
    ),
  }),
)(ListCompagnyView);
