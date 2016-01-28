import React, { Component, PropTypes } from 'react';
import radium from 'radium';
import { Shadow, Units } from './Styles';

const styles = oxygenStyle({
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
    theme: PropTypes.object
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
    return [
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
    ];
  }

  render() {
    const { children } = this.props;
    return (
      <div className={styles.root} style={this.getStyle()}>
        {children}
      </div>
    );
  }
}

export default radium(Toolbar);
