import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { endOfWeek, startOfWeek } from 'date-fns';
import { listInputs } from '../middlewares/list';
import { reset } from '../actions/list';
import { reset as inputReset } from '../../input/actions/add';
import { bindActionCreators } from 'redux';
import i18n from '../../../i18n';
import InputRow from '../components/InputRow';
import ServerErrors from '../../common/components/ServerErrors';

class ListInputsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dates: [startOfWeek(new Date()), endOfWeek(new Date())],
      changed: false,
    };
  }

  onChange = dates => {
    if (dates) {
      this.setState({ dates, changed: true });
      this.props.listInputs(this.props.match.params.type, dates);
    }
  };

  componentDidMount = () => {
    this.props.listInputs(this.props.match.params.type, this.state.dates);
  };

  componentWillUnmount = () => {
    this.props.reset();
    this.props.inputReset();
  };

  componentDidUpdate = (prevProps, prevState) => {
    const currentType = this.props.match.params.type;
    const prevType = prevProps.match.params.type;

    if (currentType !== prevType) {
      this.props.reset();

      if (this.state.dates) {
        this.props.listInputs(currentType, this.state.dates);
      }
    }
  };

  render = () => {
    const { payload, errors } = this.props.list;
    const { type } = this.props.match.params;
    const { changed, dates } = this.state;
    const icon = 'top' === type ? 'up' : 'down';

    return (
      <>
        <div className="page-header">
          <h1 className="page-title">
            <i className={`icon fe fe-thumbs-${icon}`}></i>
            {i18n.t('input.list.classement', { type })}
            {changed === false && i18n.t('input.list.periodWeek')}
            {changed === true &&
              i18n.t('input.list.periodCustom', {
                fromDate: dates[0].toLocaleDateString(),
                toDate: dates[1].toLocaleDateString(),
                interpolation: { escapeValue: false },
              })}
          </h1>
        </div>
        <div className="row">
          <div className={'col-lg-12'}>
            <ServerErrors errors={errors} />
            <div className={'card'}>
              <div className={'card-body text-wrap p-lg-6'}>
                <DateRangePicker
                  required={true}
                  onChange={this.onChange}
                  value={this.state.dates}
                />
                <div className={'table-responsive'}>
                  {0 < payload.length && (
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
                          <InputRow
                            key={key}
                            input={input}
                            type={type}
                            position={key + 1}
                          />
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
                {0 === payload.length && (
                  <div className="alert alert-primary">
                    {i18n.t('input.list.help', {
                      type,
                    })}
                  </div>
                )}
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
    errors: PropTypes.array.isRequired,
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
