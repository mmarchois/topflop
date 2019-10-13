import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { format } from 'date-fns';
import { getQuote } from '../middlewares/show';
import { reset } from '../actions/show';
import { bindActionCreators } from 'redux';
import ServerErrors from '../../common/components/ServerErrors';
import i18n from '../../../i18n';

class QuoteDetailView extends Component {
  componentDidMount = () => {
    this.props.getQuote(this.props.match.params.id);
  };

  componentWillUnmount = () => {
    this.props.reset();
  };

  render = () => {
    const { show } = this.props;
    const quote = show.payload ? show.payload : null;

    return (
      <>
        <div className="page-header">
          {quote && (
            <h1 className="page-title">
              <i className={'icon fe fe-file-text'}></i>{' '}
              {i18n.t('quote.detail.author', {
                username: `${quote.author.firstName} ${quote.author.lastName}`,
              })}
            </h1>
          )}
        </div>
        <div className="row">
          <div className={'col-lg-12'}>
            <ServerErrors errors={show.errors} />
            <div className={'card'}>
              <div className={'card-body text-wrap'}>
                {show.payload && (
                  <div className="media">
                    <div className="media-body">
                      <div className="media-heading">
                        <small className="float-right text-muted">
                          {i18n.t('quote.list.addedAt')}{' '}
                          {format(new Date(quote.createdAt), 'dd/M/Y')}
                        </small>
                      </div>
                      <div>&laquo; {quote.sentence} &raquo;</div>
                    </div>
                  </div>
                )}
                <Link
                  to={'/quotes'}
                  className="btn btn-outline-primary btn-sm mt-5"
                >
                  <i className="icon fe fe-chevron-left"></i>
                  {i18n.t('back')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
}

QuoteDetailView.propTypes = {
  reset: PropTypes.func.isRequired,
  getQuote: PropTypes.func.isRequired,
  show: PropTypes.shape({
    payload: PropTypes.object,
    errors: PropTypes.array.isRequired,
  }),
};

export default connect(
  state => ({
    show: state.quote.show,
  }),
  dispatch => ({
    ...bindActionCreators({ getQuote, reset }, dispatch),
  }),
)(QuoteDetailView);
