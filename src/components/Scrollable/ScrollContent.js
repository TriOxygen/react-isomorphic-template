import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

const css = oxygenCss({
  root: {
    position: 'relative',
    flex: 1,
    overflow: 'auto',
  }
});

export default class ScrollContent extends Component {

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  };

  render() {
    const { children, className, ...other } = this.props;
    const classes = classNames(css.root, className);
    return (
      <div className={classes} {...other}>
        {children}
      </div>
    );
  }
}