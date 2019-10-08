import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { listInputs } from '../middlewares/list';
import { reset } from '../actions/list';
import { reset as inputReset } from '../../input/actions/add';
import { bindActionCreators } from 'redux';
import i18n from '../../../i18n';
import InputRow from '../components/InputRow';

class ListInputsView extends Component {
  componentDidMount = () => {
    this.props.listInputs(this.props.match.params.type);
  };

  componentWillUnmount = () => {
    this.props.reset();
    this.props.inputReset();
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
    const icon = 'top' === type ? 'up' : 'down';

    return (
      <>
        <div className="page-header">
          <h1 className="page-title">
            <i className={`icon fe fe-thumbs-${icon}`}></i>{' '}
            {i18n.t(`input.list.type.${type}`)}
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
                <table className="table table-sm table-striped">
                  <thead>
                    <tr>
                      <th style={{ width: '70px' }}></th>
                      <th>{i18n.t('input.list.author')}</th>
                      <th style={{ width: '70px' }}>
                        {i18n.t('input.list.count')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {payload.map((input, key) => (
                      <InputRow key={key} input={input} position={key + 1} />
                    ))}
                  </tbody>
                </table>
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
  inputReset: PropTypes.func.isRequired,
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
    ...bindActionCreators({ reset, listInputs, inputReset }, dispatch),
  }),
)(ListInputsView);
