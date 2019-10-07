import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { listQuotes } from '../middlewares/list';
import { reset } from '../actions/list';
import { bindActionCreators } from 'redux';
import Pagination from '../../common/components/Pagination';
import i18n from '../../../i18n';

class ListQuoteView extends Component {
  componentDidMount = () => {
    this.props.listQuotes(this.props.match.params.page);
  };

  componentWillReceiveProps(nextProps) {
    const currentPage = this.props.match.params.page;
    const nextPage = nextProps.match.params.page;

    if (currentPage !== nextPage) {
      nextProps.listQuotes(nextPage);
    }
  }

  componentWillUnmount = () => {
    this.props.reset();
  };

  render = () => {
    const { payload, pageCount, totalItems } = this.props.list;
    const { page } = this.props.match.params;

    return (
      <>
        <h1>
          {i18n.t('quote.title')} ({totalItems})
        </h1>
        <ul className="list-group card-list-group">
          {payload.map(quote => {
            const { firstName, lastName } = quote.author;

            return (
              <li className="list-group-item py-5">
                <div className="media">
                  <div className="media-body">
                    <div className="media-heading">
                      <small className="float-right text-muted">
                        {quote.createdAt}
                      </small>
                      <h5>{`${firstName} ${lastName}`}</h5>
                    </div>
                    <div>{quote.sentence}</div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <Pagination
          pageCount={pageCount}
          page={page ? page : 1}
          baseUrl={'/quotes'}
        />
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
