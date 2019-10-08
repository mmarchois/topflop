import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { listQuotes } from '../middlewares/list';
import { reset } from '../actions/list';
import { bindActionCreators } from 'redux';
import Pagination from '../../common/components/Pagination';
import i18n from '../../../i18n';
import QuoteRow from '../components/QuoteRow';

class ListQuoteView extends Component {
  componentDidMount = () => {
    this.props.listQuotes(this.props.match.params.page);
  };

  componentDidUpdate = (prevProps, prevState) => {
    const currentPage = this.props.match.params.page;
    const prevPage = prevProps.match.params.page;

    if (currentPage !== prevPage) {
      this.props.listQuotes(currentPage);
    }
  };

  componentWillUnmount = () => {
    this.props.reset();
  };

  render = () => {
    const { payload, pageCount, totalItems } = this.props.list;
    const { page } = this.props.match.params;

    return (
      <>
        <div className="page-header">
          <h1 className="page-title">
            <i className="icon fe fe-code"></i> {i18n.t('quote.title')} (
            {totalItems})
          </h1>
        </div>

        <div className="row">
          <div className={'col-lg-12'}>
            <div className={'card'}>
              <div className={'card-body text-wrap p-lg-6'}>
                <Link to={'/users'} className="btn btn-outline-primary mb-4">
                  <i className="icon fe fe-plus"></i>
                  {i18n.t('quote.list.add')}
                </Link>

                <ul className="list-group card-list-group">
                  {payload.map(quote => {
                    return <QuoteRow key={quote.id} quote={quote} />;
                  })}
                </ul>

                <Pagination
                  pageCount={pageCount}
                  page={page ? page : 1}
                  baseUrl={'/quotes'}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
}

ListQuoteView.propTypes = {
  listQuotes: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  list: PropTypes.shape({
    payload: PropTypes.array.isRequired,
    totalItems: PropTypes.number.isRequired,
    pageCount: PropTypes.number.isRequired,
  }),
};

export default connect(
  state => ({
    list: state.quote.list,
  }),
  dispatch => ({
    ...bindActionCreators({ listQuotes, reset }, dispatch),
  }),
)(ListQuoteView);
