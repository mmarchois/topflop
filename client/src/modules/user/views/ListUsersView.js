import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { listUsers } from '../middlewares/list';
import { reset } from '../actions/list';
import { bindActionCreators } from 'redux';
import UserRow from '../components/UserRow';
import i18n from '../../../i18n';
import Pagination from '../../common/components/Pagination';

class ListUsersView extends Component {
  componentDidMount = () => {
    this.props.listUsers(this.props.match.params.page);
  };

  componentWillUnmount = () => {
    this.props.reset();
  };

  render = () => {
    const { payload, totalItems, pageCount } = this.props.list;
    const { page } = this.props.match.params;

    return (
      <>
        <h1>
          {i18n.t('user.title')} ({totalItems})
        </h1>

        <div className="table-responsive">
          <table className="table card-table table-striped table-vcenter">
            <thead>
              <tr>
                <th>{i18n.t('user.list.name')}</th>
                <th>{i18n.t('user.list.email')}</th>
                <th>{i18n.t('user.list.role')}</th>
              </tr>
            </thead>
            <tbody>
              {payload.map(user => {
                return <UserRow key={user.id} user={user} />;
              })}
            </tbody>
          </table>
        </div>
        <Pagination
          pageCount={pageCount}
          page={page ? page : 1}
          baseUrl={'/users'}
        />
      </>
    );
  };
}

ListUsersView.propTypes = {
  listUsers: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  list: PropTypes.shape({
    payload: PropTypes.array.isRequired,
    totalItems: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired,
  }),
};

export default connect(
  state => ({
    list: state.user.list,
  }),
  dispatch => ({
    ...bindActionCreators({ listUsers, reset }, dispatch),
  }),
)(ListUsersView);
