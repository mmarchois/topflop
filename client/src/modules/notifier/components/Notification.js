import React from 'react';
import { connect } from 'react-redux';
import { mercureSubscriber } from '../../../utils/mercure';
import i18n from '../../../i18n';

class Notification extends React.Component {
  state = {
    message: '',
  };

  handleMercure = () => {
    const {
      authentication: {
        user: { compagny },
      },
    } = this.props;

    if (!compagny) {
      return;
    }

    mercureSubscriber(compagny.id).onmessage = ({ data }) => {
      const payload = JSON.parse(data);

      this.setState({
        message: i18n.t(payload.key, { user: payload.user }),
      });
    };
  };

  componentDidMount = () => {
    this.handleMercure();
  };

  componentDidUpdate = prevProps => {
    const compagny = prevProps.authentication.user.compagny;
    const currentCompagny = this.props.authentication.user.compagny;

    if (compagny !== currentCompagny) {
      this.handleMercure();
    }
  };

  render = () => {
    const { message } = this.state;

    return (
      <>
        {message && (
          <div className="alert alert-primary" role="alert">
            <i className={'icon fe fe-bell mr-2'}></i>
            {message}
          </div>
        )}
      </>
    );
  };
}

export default connect(state => ({
  authentication: state.auth.authentication,
}))(Notification);
