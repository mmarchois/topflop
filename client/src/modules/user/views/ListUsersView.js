import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { listUsers } from '../middlewares/list';
import { addInput } from '../../input/middlewares/add';
import { reset } from '../actions/list';
import { bindActionCreators } from 'redux';
import UserRow from '../components/UserRow';
import i18n from '../../../i18n';
import Pagination from '../../common/components/Pagination';
import ServerErrors from '../../common/components/ServerErrors';
import SuccessMessage from '../../common/components/SuccessMessage';

class ListUsersView extends Component {
  componentDidMount = () => {
    this.props.listUsers(this.props.match.params.page);
  };

  componentWillUnmount = () => {
    this.props.reset();
  };

  componentDidUpdate = (prevProps, prevState) => {
    const currentPage = this.props.match.params.page;
    const prevPage = prevProps.match.params.page;

    if (currentPage !== prevPage) {
      this.props.listUsers(currentPage);
    }
  };

  render = () => {
    const { payload, totalItems, pageCount } = this.props.list;
    const { currentUser, input, addInput } = this.props;
    const { page } = this.props.match.params;

    return (
      <>
        <div className="page-header">
          <h1 className="page-title">
            <i className="icon fe fe-users"></i> {i18n.t('user.title')} (
            {totalItems})
          </h1>
        </div>

        <div className="row">
          <div className={'col-lg-12'}>
            <ServerErrors errors={input.errors} />
            {input.payload && (
              <SuccessMessage
                message={i18n.t(`input.success.${input.payload.type}`, {
                  user: input.payload.author.firstName,
                })}
              />
            )}
            <div className={'card'}>
              <div className={'card-body text-wrap p-lg-6'}>
                {'admin' === currentUser.role && (
                  <Link
                    to={'/users/add'}
                    className="btn btn-outline-primary mb-4"
                  >
                    <i className="icon fe fe-plus"></i>
                    {i18n.t('user.list.add')}
                  </Link>
                )}
                <p>{i18n.t('user.list.actionsHelp')}</p>
                <table className="table card-table table-striped table-vcenter">
                  <thead>
                    <tr>
                      <th>{i18n.t('user.list.name')}</th>
                      <th>{i18n.t('user.list.email')}</th>
                      {'admin' === currentUser.role && (
                        <th>{i18n.t('user.list.role')}</th>
                      )}
                      <th>{i18n.t('user.list.actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payload.map(user => (
                      <UserRow
                        key={user.id}
                        onFlop={() => addInput('flop', user.id)}
                        onTop={() => addInput('top', user.id)}
                        user={user}
                        currentUser={currentUser}
                      />
                    ))}
                  </tbody>
                </table>
                <Pagination
                  pageCount={pageCount}
                  page={page ? page : 1}
                  baseUrl={'/users'}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
}

ListUsersView.propTypes = {
  addInput: PropTypes.func.isRequired,
  listUsers: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  list: PropTypes.shape({
    payload: PropTypes.array.isRequired,
    totalItems: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired,
  }),
};

export default connect(
  state => ({
    list: state.user.list,
    currentUser: state.auth.authentication.user,
    input: state.input.add,
  }),
  dispatch => ({
    ...bindActionCreators({ listUsers, reset, addInput }, dispatch),
  }),
)(ListUsersView);
