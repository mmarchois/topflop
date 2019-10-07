import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { listInputs } from '../middlewares/list';
import { reset } from '../actions/list';
import { bindActionCreators } from 'redux';
import i18n from '../../../i18n';

class ListInputsView extends Component {
  componentDidMount = () => {
    this.props.listInputs(this.props.match.params.type);
  };

  componentWillUnmount = () => {
    this.props.reset();
  };

  componentWillReceiveProps(nextProps) {
    const currentType = this.props.match.params.type;
    const nextType = nextProps.match.params.type;

    if (currentType !== nextType) {
      nextProps.listInputs(nextType);
    }
  }

  render = () => {
    const { payload } = this.props.list;
    const { type } = this.props.match.params;

    return (
      <>
        <h1>{i18n.t(`input.type.${type}`)}</h1>
        <ul>
          {payload.map(input => (
            <li key={input.author.lastName}>
              {input.author.firstName} {input.author.lastName} : {input.counter}
            </li>
          ))}
        </ul>
      </>
    );
  };
}

ListInputsView.propTypes = {
  listInputs: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  list: PropTypes.shape({
    payload: PropTypes.array.isRequired,
  }),
};

export default connect(
  state => ({
    list: state.input.list,
  }),
  dispatch => ({
    ...bindActionCreators({ reset, listInputs }, dispatch),
  }),
)(ListInputsView);
