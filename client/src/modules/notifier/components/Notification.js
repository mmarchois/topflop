import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import i18n from '../../../i18n';
import { reset } from '../actions/message';

class Notification extends React.Component {
  componentWillUnmount = () => {
    this.props.reset();
  };

  render = () => {
    const { message } = this.props;

    if (!message.payload) {
      return null;
    }

    const { key, user } = message.payload;

    return (
      <div className="alert alert-primary" role="alert">
        <i className={'icon fe fe-bell mr-2'}></i>
        {i18n.t(key, { user })}
      </div>
    );
  };
}

Notification.propTypes = {
  message: PropTypes.object.isRequired,
  reset: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    message: state.notifier.message,
  }),
  dispatch => ({
    ...bindActionCreators({ reset }, dispatch),
  }),
)(Notification);
