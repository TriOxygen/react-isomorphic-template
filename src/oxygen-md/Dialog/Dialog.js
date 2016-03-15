import React, { PropTypes, Component } from 'react';
import Transition from 'react-motion-ui-pack';
import Portal from '../Portal';
import Overlay from '../Overlay';
import Paper from '../Paper';
import { Units } from '../Styles';

export default class Dialog extends Component {

  static propTypes = {
    children: PropTypes.node,
    onRequestClose: PropTypes.func,
  };

  handleTap = () => {
    if (this.props.onRequestClose) {
      this.props.onRequestClose();
    }
  };

  stop = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  render() {
    const { children } = this.props;
    return (
      <Portal dialog>
        <Transition
          component={false} // don't use a wrapping component
          enter={{
            opacity: 1,
          }}
          leave={{
            opacity: 0,
          }}
        >
          <Overlay onTouchTap={this.handleTap} key="dialog">
            <Paper className={css.container} onTouchTap={this.stop}>
              {children}
            </Paper>
          </Overlay>
        </Transition>
      </Portal>
    );
  }
}

const css = oxygenCss({
  container: {
    width: Units.phone.keylineIncrement * 8,
    // height: Units.phone.keylineIncrement * 6,
  }
});