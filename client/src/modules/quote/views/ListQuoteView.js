import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { listQuotes } from '../middlewares/list';
import { reset } from '../actions/list';
import { bindActionCreators } from 'redux';
import Pagination from '../../common/components/Pagination';
import i18n from '../../../i18n';
import QuoteRow from '../components/QuoteRow';
import ServerErrors from '../../common/components/ServerErrors';

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
    const { payload, pageCount, totalItems, errors } = this.props.list;
    const { page } = this.props.match.params;

    return (
      <>
        <div className="page-header">
          <h1 className="page-title">
            <i className="icon fe fe-file-text"></i> {i18n.t('quote.title')} (
            {totalItems})
          </h1>
        </div>

        <div className="row">
          <div className={'col-lg-12'}>
            <ServerErrors errors={errors} />
            <div className={'card'}>
              <div className={'card-body text-wrap'}>
                {0 < payload.length && (
                  <table className="table table-sm table-striped">
                    <thead>
                      <tr>
                        <th>{i18n.t('quote.list.quote')}</th>
                        <th style={{ width: '70px' }}>
                          {i18n.t('quote.list.actions')}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {payload.map(quote => {
                        return <QuoteRow key={quote.id} quote={quote} />;
                      })}
                    </tbody>
                  </table>
                )}
                {0 === payload.length && (
                  <div className="alert alert-primary">
                    {i18n.t('quote.list.help')}
                  </div>
                )}
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
    errors: PropTypes.array.isRequired,
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
