import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userMessageActions from 'reducers/userMessageReducer';
import { SnackBar } from 'oxygen-md';

class MainAppBar extends Component {

  static propTypes = {
    addMessage: PropTypes.func,
    nextMessage: PropTypes.func,
    message: PropTypes.object
  };

  nextMessage = () => {
    const { nextMessage } = this.props;
    nextMessage();
  }

  render() {
    const { message } = this.props;
    return (
      <SnackBar message={message.message} time={message.time} onRequestNext={this.nextMessage}/>
    );
  }

}

function mapDispatchToProps(dispatch) {
  return {
    addMessage: bindActionCreators(userMessageActions.addMessage, dispatch),
    nextMessage: bindActionCreators(userMessageActions.nextMessage, dispatch),
  }
}

function mapStateToProps(state) {
  return {
    message: state.userMessage.currentMessage,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainAppBar);
