import React, { Component, PropTypes } from 'react';
import { Typography, Units } from '../Styles';
import classNames from 'classnames';

const css = oxygenCss({
  root: {
    position: 'relative',
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
    className: PropTypes.string,
    children: PropTypes.node
  };


  render() {
    const { children, className, ...other } = this.props;
    const classes = classNames(className, css.root);
    return (
      <div className={classes} {...other}>
          {children}
      </div>
    );
  }
}

export default List;
