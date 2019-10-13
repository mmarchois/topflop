import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { listUsers } from '../middlewares/list';
import { addInput } from '../../input/middlewares/add';
import { reset as resetDelete } from '../actions/delete';
import { deleteUser } from '../middlewares/delete';
import { reset as resetInput } from '../../input/actions/add';
import { reset } from '../actions/list';
import { bindActionCreators } from 'redux';
import UserRow from '../components/UserRow';
import i18n from '../../../i18n';
import Pagination from '../../common/components/Pagination';
import ServerErrors from '../../common/components/ServerErrors';
import SuccessMessage from '../../common/components/SuccessMessage';
import Search from '../components/Search';

class ListUsersView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
    };
  }

  componentDidMount = () => {
    this.props.listUsers(this.props.match.params.page);
  };

  componentWillUnmount = () => {
    this.props.reset();
    this.props.resetInput();
    this.props.resetDelete();
  };

  handleSearch = e => {
    e.preventDefault();

    this.props.listUsers(1, this.state.search);
  };

  handleDelete = userId => {
    if (window.confirm(i18n.t('user.list.deleteConfirm'))) {
      this.props.deleteUser(userId);
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    const currentPage = this.props.match.params.page;
    const prevPage = prevProps.match.params.page;

    if (currentPage !== prevPage) {
      this.props.listUsers(currentPage);
    }
  };

  render = () => {
    const { payload, totalItems, errors, pageCount } = this.props.list;
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
            <ServerErrors errors={[...input.errors, ...errors]} />

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
                <Search
                  handleSearch={this.handleSearch}
                  search={this.state.search}
                  onChange={e => {
                    this.setState({ search: e.target.value });
                  }}
                />
                <div className={'table-responsive'}>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>{i18n.t('user.list.name')}</th>
                        <th>{i18n.t('user.list.actions')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payload.map(user => (
                        <UserRow
                          key={user.id}
                          onFlop={() => addInput('flop', user.id)}
                          onTop={() => addInput('top', user.id)}
                          onDelete={() => this.handleDelete(user.id)}
                          user={user}
                          currentUser={currentUser}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
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
  resetInput: PropTypes.func.isRequired,
  listUsers: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired,
  delete: PropTypes.object.isRequired,
  list: PropTypes.shape({
    payload: PropTypes.array.isRequired,
    totalItems: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired,
    errors: PropTypes.array.isRequired,
  }),
};

export default connect(
  state => ({
    delete: state.user.delete,
    list: state.user.list,
    currentUser: state.auth.authentication.user,
    input: state.input.add,
  }),
  dispatch => ({
    ...bindActionCreators(
      { listUsers, resetDelete, deleteUser, resetInput, reset, addInput },
      dispatch,
    ),
  }),
)(ListUsersView);
