import React, { PropTypes, Component } from 'react';
import Transition from 'react-motion-ui-pack';
import Portal from '../Portal';
import Overlay from '../Overlay';
import Paper from '../Paper';
import { Units } from '../Styles';

const ESC = 27;

export default class Drawer extends Component {

  static propTypes = {
    children: PropTypes.node,
    onRequestClose: PropTypes.func,
  };

  handleTap = () => {
    if (this.props.onRequestClose) {
      this.props.onRequestClose();
    }
  };

  componentWillMount() {
    document.addEventListener('keyup', this.handleKey);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKey);
  }

  handleKey = (event) => {
    const { keyCode } = event;
    if (keyCode === ESC && this.props.onRequestClose) {
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
        <div>
          <Transition
            component={false} // don't use a wrapping component
            enter={{
              opacity: 1,
            }}
            leave={{
              opacity: 0,
            }}
          >
            <Overlay center={false} onTouchTap={this.handleTap} key="drawer" onKeyup={this.handleKey}>
            </Overlay>
          </Transition>
          <Transition
            component={false} // don't use a wrapping component
            enter={{
              left: 0,
            }}
            leave={{
              left: -Units.phone.keylineIncrement * 5,
            }}
          >
            <Paper key="drawer" className={css.container} onTouchTap={this.stop}>
              {children}
            </Paper>
          </Transition>
        </div>
      </Portal>
    );
  }
}

const css = oxygenCss({
  container: {
    position: 'absolute',
    width: Units.phone.keylineIncrement * 4,
    top: 0,
    bottom: 0,
    // height: Units.phone.keylineIncrement * 6,
  },
});