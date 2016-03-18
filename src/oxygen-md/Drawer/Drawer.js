import React, { PropTypes, Component } from 'react';
import { Motion, spring } from 'react-motion';
import DrawerContainer from './DrawerContainer';

export default class Drawer extends Component {

  static propTypes = {
    children: PropTypes.node,
    open: PropTypes.bool,
    onRequestClose: PropTypes.func,
    onRequestOpen: PropTypes.func,
  };

  static defaultProps = {
    open: false
  };

  handleRequestOpen = () => {
    const { open, onRequestOpen } = this.props;
    if (!open && onRequestOpen) {
      onRequestOpen();
    }
  };

  handleRequestClose = () => {
    const { open, onRequestClose } = this.props;
    if (open && onRequestClose) {
      onRequestClose();
    }
  };

  render() {
    const { open, children } = this.props;

    return (
      <Motion style={{ left: spring(open ? 0 : -256, { stiffness: 300, damping: 25 }), top: open ? 0 : -100, opacity: spring(open ? 1 : 0) }}>
        {interpolated => {
          if (interpolated.opacity > 0) {
            return <DrawerContainer {...interpolated} onRequestClose={this.handleRequestClose} onRequestOpen={this.handleRequestOpen}>{children}</DrawerContainer>;
          }
          return null;
        }}
      </Motion>
    );
  }
}