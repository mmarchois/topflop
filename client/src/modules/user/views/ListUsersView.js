import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { listUsers } from '../middlewares/list';
import { reset } from '../actions/list';
import { bindActionCreators } from 'redux';
import UserRow from '../components/UserRow';
import i18n from '../../../i18n';
import Pagination from '../../common/components/Pagination';
import ServerErrors from '../../common/components/ServerErrors';

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
    const { role } = this.props;
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
            <ServerErrors errors={[]} />
            <div className={'card'}>
              <div className={'card-body text-wrap p-lg-6'}>
                {'admin' === role && (
                  <Link
                    to={'/users/add'}
                    className="btn btn-outline-primary mb-4"
                  >
                    <i className="icon fe fe-plus"></i>
                    {i18n.t('user.list.add')}
                  </Link>
                )}
                <table className="table card-table table-striped table-vcenter">
                  <thead>
                    <tr>
                      <th>{i18n.t('user.list.name')}</th>
                      <th>{i18n.t('user.list.email')}</th>
                      <th>{i18n.t('user.list.role')}</th>
                      <th>{i18n.t('user.list.actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payload.map(user => {
                      return <UserRow key={user.id} user={user} />;
                    })}
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
  listUsers: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
  list: PropTypes.shape({
    payload: PropTypes.array.isRequired,
    totalItems: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired,
  }),
};

export default connect(
  state => ({
    list: state.user.list,
    role: state.auth.authentication.user.role,
  }),
  dispatch => ({
    ...bindActionCreators({ listUsers, reset }, dispatch),
  }),
)(ListUsersView);
