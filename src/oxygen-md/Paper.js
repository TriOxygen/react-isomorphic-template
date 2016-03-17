import React, { Component, PropTypes } from 'react';
import { Units, Shadow } from './Styles';
import classNames from 'classnames';

const styles = oxygenCss({
  root: {
    boxSizing: 'border-box',
    '&padded': {
      padding: Units.phone.gutter.mini,
    },
    '&spaced': {
      margin: Units.phone.gutter.mini,
    },
    '&rounded': {
      borderRadius: Units.phone.borderRadius
    }
  },
});

class Paper extends Component {
  static propTypes = {
    zDepth: PropTypes.number,
    transparent: PropTypes.bool,
    padded: PropTypes.bool,
    spaced: PropTypes.bool,
    rounded: PropTypes.bool,
    children: PropTypes.node,
    style: PropTypes.object,
    className: PropTypes.string,
    theme: PropTypes.object
  };

  static contextTypes = {
    theme: PropTypes.object
  };

  static defaultProps = {
    zDepth: 1,
    rounded: true,
  };

  getStyle() {
    const theme = this.props.theme || this.context.theme;
    const { zDepth, transparent, style } = this.props;
    return Object.assign({},
      transparent ? null : {
        backgroundColor: theme.theme.card.hex,
        color: theme.text.default,
        boxShadow: Shadow[zDepth]
      }, style);
  }

  render() {
    const { children, spaced, padded, rounded, className, style, ...other } = this.props;
    const classes = classNames(className, styles.root, {
      [styles.spaced]: spaced,
      [styles.padded]: padded,
      [styles.rounded]: rounded,
    });
    console.log(this.getStyle());
    return (
      <div className={classes} style={this.getStyle()} {...other}>
        {children}
      </div>
    );
  }
}

export default Paper;
