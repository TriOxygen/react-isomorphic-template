import React, { PropTypes, Component } from 'react';
import View from './View';

export default class Overlay extends Component {
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
    backgroundColor: PropTypes.string,
  };

  static defaultProps = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  };

  componentDidMount() {
    this.bodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // make body none scrolling
  }

  componentWillUnmount() {
    // make body scrolling again
    document.body.style.overflow = this.bodyOverflow;
  }


  render() {
    const { backgroundColor, children, style, ...other } = this.props;
    return (
      <View className={css.overlay} style={Object.assign({ backgroundColor }, style)} {...other}>{children}</View>
    );
  }
}

const css = oxygenCss({
  overlay: {
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'cubic-bezier(0.23, 1, 0.32, 1) 0.450s all',
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
});
