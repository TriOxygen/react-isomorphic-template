import React, { PropTypes, Component } from 'react';
import Portal from '../Portal';
import Overlay from '../Overlay';
import Paper from '../Paper';
import { Units } from '../Styles';

const ESC = 27;

export default class DrawerContainer extends Component {

  static propTypes = {
    position: PropTypes.number,
    width: PropTypes.number,
    children: PropTypes.node,
    right: PropTypes.bool,
    overlay: PropTypes.bool,
    onRequestClose: PropTypes.func,
    onRequestOpen: PropTypes.func,
  };

  static defaultProps = {
    overlay: true,
    right: false,
    width: Units.phone.keylineIncrement * 4
  };

  handleTap = () => {
    if (this.props.onRequestClose) {
      this.props.onRequestClose();
    }
  };

  componentDidMount() {
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
    const { onRequestOpen } = this.props;
    if (onRequestOpen) {
      onRequestOpen();
    }
    event.preventDefault();
    event.stopPropagation();
  };

  render() {
    const { overlay, width, right, children } = this.props;
    let { position } = this.props;
    if (position > 1) {
      position = 1;
    }
    const transform = right ? `translate3d(100vw,0,0) translateX(${position * -100}%)` : `translate3d(${(position - 1) * 100}%, 0, 0)`;
    const overlayPosition = position > 0 ? 0 : -100;
    return (
      <Portal menu>
        {overlay ?
          <Overlay
            center={false}
            onTouchTap={this.handleTap}
            onKeyup={this.handleKey}
            style={{ opacity: position, top: `${overlayPosition}%` }}
          /> : null }
        <Paper
          rounded={false}
          style={{ width, transform }}
          className={css.container}
          onTouchTap={this.stop}
        >
          {children}
        </Paper>
      </Portal>
    );
  }
}

const css = oxygenCss({
  container: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    // height: Units.phone.keylineIncrement * 6,
  },
});