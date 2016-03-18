import React, { PropTypes, Component } from 'react';
import Portal from '../Portal';
import Overlay from '../Overlay';
import Paper from '../Paper';
import { Units } from '../Styles';

const ESC = 27;

export default class DrawerContainer extends Component {

  static propTypes = {
    left: PropTypes.number,
    top: PropTypes.number,
    opacity: PropTypes.number,
    children: PropTypes.node,
    onRequestClose: PropTypes.func,
    onRequestOpen: PropTypes.func,
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
    if (this.props.onRequestOpen) {
      this.props.onRequestOpen();
    }
    event.preventDefault();
    event.stopPropagation();
  };

  render() {
    const { left, top, opacity, children } = this.props;
    return (
      <Portal menu>
        <Overlay center={false} onTouchTap={this.handleTap} onKeyup={this.handleKey} style={{ opacity, top: `${top}%` }}/>
        <Paper style={{ transform: `translate3d(${left}px, 0, 0)` }} className={css.container} onTouchTap={this.stop}>
          {children}
        </Paper>
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