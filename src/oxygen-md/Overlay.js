import React, { PropTypes, Component } from 'react';
import View from './View';
import classNames from 'classnames';

export default class Overlay extends Component {
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
    backgroundColor: PropTypes.string,
    center: PropTypes.bool,
  };

  static defaultProps = {
    center: true,
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
    const { center, backgroundColor, children, style, ...other } = this.props;
    if (center) {
      return (
        <View className={classNames(css.overlay, css.center)} style={Object.assign({ backgroundColor }, style)} {...other}>{children}</View>
      );
    }
    return (
      <div className={css.overlay} style={Object.assign({ backgroundColor }, style)} {...other}>{children}</div>
    );
  }
}

const css = oxygenCss({
  overlay: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'cubic-bezier(0.23, 1, 0.32, 1) 0.450s all',
  },
});
