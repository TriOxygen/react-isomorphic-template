import React, { Component, PropTypes } from 'react';
import Paper from '../Paper';
import { Typography, Units } from '../Styles';

const styles = oxygenStyle({
  root: {
    fontSize: `${Typography.phone.base.fontSize}`,
    fontFamily: `${Typography.phone.base.fontFamily}`,
    width: `${Units.phone.keylineIncrement * 12}`,
    padding: `${Units.phone.menu.padding}px 0`,
    margin: `0 ${Units.phone.menu.margin}px`,
    '@desktop': {
      fontSize: `${Typography.desktop.base.fontSize}`,
      fontFamily: `${Typography.desktop.base.fontFamily}`,
      width: `${Units.desktop.keylineIncrement * 12}`,
      padding: `${Units.desktop.menu.padding}px 0`,
      margin: `0 ${Units.desktop.menu.margin}px`
    }
  }
});

class Menu extends Component {
  static displayName = 'Menu';

  static propTypes = {
    theme: PropTypes.object,
    children: PropTypes.node
  };

  static contextTypes = {
    theme: PropTypes.object
  };


  render() {
    const { children } = this.props;
    return (
      <Paper className={styles.root}>
          {children}
      </Paper>
    );
  }
}

export default Menu;
