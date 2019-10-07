import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { listQuotes } from '../middlewares/list';
import { reset } from '../actions/list';
import { bindActionCreators } from 'redux';

class ListQuoteView extends Component {
  componentDidMount = () => {
    this.props.listQuotes(1);
  };

  componentWillUnmount = () => {
    this.props.reset();
  };

  render = () => {
    const { payload } = this.props.list;

    return (
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
    );
  };
}

ListQuoteView.propTypes = {
  listQuotes: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  list: PropTypes.shape({
    payload: PropTypes.array.isRequired,
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
