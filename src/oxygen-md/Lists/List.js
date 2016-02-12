import React, { Component, PropTypes } from 'react';
import { Typography, Units } from '../Styles';

const styles = oxygenCss({
  root: {
    fontSize: Typography.phone.base.fontSize,
    fontFamily: Typography.phone.base.fontFamily,
    padding: `${Units.phone.list.padding}px 0`,
    margin: `0 ${Units.phone.list.margin}px`,
    '@desktop': {
      fontSize: Typography.desktop.base.fontSize,
      fontFamily: Typography.desktop.base.fontFamily,
      padding: `${Units.desktop.list.padding}px 0`,
      margin: `0 ${Units.desktop.list.margin}px`
    }
  }
});

class List extends Component {
  static displayName = 'List';

  static propTypes = {
    children: PropTypes.node
  };


  render() {
    const { children } = this.props;
    return (
      <div className={styles.root}>
          {children}
      </div>
    );
  }
}

export default List;
