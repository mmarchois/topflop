import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { endOfWeek, startOfWeek, format } from 'date-fns';
import { listInputs } from '../middlewares/list';
import { reset } from '../actions/list';
import { bindActionCreators } from 'redux';
import i18n from '../../../i18n';
import InputChart from '../components/InputChart';

class ListInputsView extends Component {
  componentDidMount = () => {
    this.props.listInputs(this.props.match.params.type);
  };

  componentWillUnmount = () => {
    this.props.reset();
  };

  componentDidUpdate = (prevProps, prevState) => {
    const currentType = this.props.match.params.type;
    const prevType = prevProps.match.params.type;

    if (currentType !== prevType) {
      this.props.listInputs(currentType);
    }
  };

  render = () => {
    const { payload } = this.props.list;
    const { type } = this.props.match.params;
    const current = new Date();
    const fromDate = format(startOfWeek(current), 'dd/M/Y');
    const toDate = format(endOfWeek(current), 'dd/M/Y');
    const icon = 'top' === type ? 'up' : 'down';

    return (
      <>
        <div className="page-header">
          <h1 className="page-title">
            <i className={`icon fe fe-thumbs-${icon}`}></i>{' '}
            {i18n.t(`input.type.${type}`)}{' '}
            {i18n.t('input.list.fromTo', {
              from: fromDate,
              to: toDate,
              interpolation: { escapeValue: false },
            })}
          </h1>
        </div>
        <div className="row">
          <div className={'col-lg-12'}>
            <div className={'card'}>
              <div className={'card-body text-wrap p-lg-6'}>
                <Link to={'/users'} className="btn btn-outline-primary mb-4">
                  <i className="icon fe fe-plus"></i>
                  {i18n.t('input.list.add', { type })}
                </Link>

                <InputChart payload={payload} />
              </div>
            </div>
          </div>
        </div>
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
