import React, { PropTypes, Component } from 'react';
import { Motion, spring } from 'react-motion';
import DrawerContainer from './DrawerContainer';

export default class Drawer extends Component {

  state = {
    position: this.props.position
  };

  static propTypes = {
    children: PropTypes.node,
    position: PropTypes.number,
    onRequestClose: PropTypes.func,
    onRequestOpen: PropTypes.func,
  };

  static defaultProps = {
    position: 0,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.position !== this.state.position) {
      this.setState({ position: nextProps.position });
    }
  }

  handleRequestOpen = () => {
    const { position, onRequestOpen } = this.props;
    if (!position && onRequestOpen) {
      onRequestOpen();
    }
  };

  handleRequestClose = () => {
    const { position, onRequestClose } = this.props;
    if (position && onRequestClose) {
      onRequestClose();
    }
  };

  render() {
    const { children, onRequestOpen, onRequestClose, ...other } = this.props;
    const { position } = this.state;
    return (
      <Motion
        style={{
          position: spring(position, { stiffness: 300, damping: 25, precision: 0.01 }),
        }}
      >
        {interpolated => {
          if (interpolated.position > 0) {
            return <DrawerContainer onRequestClose={this.handleRequestClose} onRequestOpen={this.handleRequestOpen} {...other} {...interpolated}>{children}</DrawerContainer>;
          }
          return null;
        }}
      </Motion>
    );
  }
}