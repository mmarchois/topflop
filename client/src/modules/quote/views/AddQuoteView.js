import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { reset } from '../actions/add';
import { addQuote } from '../middlewares/add';
import i18n from '../../../i18n';
import QuoteForm from '../components/form/QuoteForm';

class AddQuoteView extends Component {
  componentWillUnmount = () => {
    this.props.reset();
  };

  handleSubmit = values => {
    this.props.addQuote(values);
  };

  render = () => {
    const { loading, payload } = this.props.add;

    if (payload) {
      return <Redirect to={'/quotes'} />;
    }

    return (
      <>
        <h1>{i18n.t('quote.add.title')}</h1>
        <p>{i18n.t('quote.add.introduction')}</p>
        <QuoteForm loading={loading} onSubmit={this.handleSubmit} />
      </>
    );
  };
}

AddQuoteView.propTypes = {
  addQuote: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  add: PropTypes.shape({
    payload: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    errors: PropTypes.array.isRequired,
  }),
};

export default connect(
  state => ({
    add: state.quote.add,
  }),
  dispatch => ({
    ...bindActionCreators({ reset, addQuote }, dispatch),
  }),
)(AddQuoteView);
