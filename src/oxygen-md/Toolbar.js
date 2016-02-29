import React, { Component, PropTypes } from 'react';
import { Shadow, Units } from './Styles';
import View from './View';
import IconButton from './IconButton';
import classNames from 'classnames';

const styles = oxygenCss({
  root: {
    userSelect: 'none',
    boxSizing: 'border-box',
    padding: `0 ${Units.phone.gutter.mini}px`,
    height: Units.phone.toolbar.height,
    lineHeight: `${Units.phone.toolbar.height}px`,
    '@desktop': {
      padding: `0 ${Units.desktop.gutter.mini}px`,
      height: Units.desktop.toolbar.height,
      lineHeight: `${Units.desktop.toolbar.height}px`
    }
  }
});

class Toolbar extends Component {
  static displayName = 'Toolbar';

  static propTypes = {
    zDepth: PropTypes.number,
    transparent: PropTypes.bool,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    children: PropTypes.node,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    theme: PropTypes.object,
    className: PropTypes.string
  };

  static contextTypes = {
    theme: PropTypes.object
  };

  static defaultProps = {
    zDepth: 1
  };

  getStyle() {
    const theme = this.props.theme || this.context.theme;
    const { zDepth, primary, secondary, transparent } = this.props;
    return Object.assign({},
      transparent ? null : {
        backgroundColor: theme.theme.statusBar.material,
        color: theme.theme.statusBar.text.default,
        boxShadow: Shadow[zDepth]
      },
      secondary && !transparent ? {
        backgroundColor: theme.secondary1,
        color: theme.secondary1Text
      } : null,
      primary && !transparent ? {
        backgroundColor: theme.primary1,
        color: theme.primary1Text
      } : null,
    );
  }

  getIconStyle() {
    const theme = this.props.theme || this.context.theme;
    const { primary, secondary, transparent, zDepth } = this.props;
    return Object.assign({},
      transparent ? null : {
        backgroundColor: theme.theme.statusBar.material,
        color: theme.theme.statusBar.text.default,
        boxShadow: Shadow[zDepth]
      },
      secondary && !transparent ? {
        backgroundColor: theme.secondary1,
        color: theme.secondary1Text
      } : null,
      primary && !transparent ? {
        backgroundColor: theme.primary1,
        color: theme.primary1Text
      } : null,
    );

  }

  render() {
    const { children, leftIcon, rightIcon, className, primary, secondary, ...other } = this.props;
    const classes = classNames(styles.root, className);
    return (
      <View row className={classes} style={this.getStyle()} {...other}>
        <View grow={0} ><IconButton>{leftIcon}</IconButton></View>
        <View grow={1}>{children}</View>
        <View grow={0} ><IconButton>{rightIcon}</IconButton></View>
      </View>
    );
  }
}

export default Toolbar;
