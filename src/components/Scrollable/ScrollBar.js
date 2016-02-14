import React, { Component, PropTypes } from 'react';
import { Units, Shadow } from 'oxygen-md/Styles';

const css = oxygenCss({
  container: {
    position: 'absolute',
    right: Units.phone.gutter.mini / 2,
    top: Units.phone.gutter.mini / 2,
    bottom: Units.phone.gutter.mini / 2,
    width: Units.phone.gutter.mini / 2,
    backgroundColor: 'rgba(128, 128, 128, 0.3)'
  },
  thumb: {
    position: 'absolute',
    width: Units.phone.gutter.mini / 2,
    height: Units.phone.gutter.mini,
    borderRadius: Units.phone.gutter.mini / 4,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    boxShadow: Shadow[1]
  }
});

export default class ScrollBar extends Component {

  static propTypes = {
    scrollTop: PropTypes.number,
    height: PropTypes.number,
    scrollMax: PropTypes.number
  };

  shouldComponentUpdate(nextProps) {
    return nextProps !== this.props;
  }

  render () {
    const { scrollTop, height, scrollMax, ...other } = this.props;
    const position = (scrollTop / scrollMax) * (height - Units.phone.gutter.mini * 2);
    return (
      <div className={css.container} {...other}>
        <div ref={'thumb'} className={css.thumb} style={{
          transform: `translate3d(0, ${position}px, 0)`
        }}/>
      </div>
    );
  }
}