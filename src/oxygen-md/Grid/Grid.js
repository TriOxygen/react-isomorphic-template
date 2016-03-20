import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { Units } from '../Styles';

class Grid extends Component {

  static propTypes = {
    theme: PropTypes.object,
    top: PropTypes.bool,
    bottom: PropTypes.bool,
    gutter: PropTypes.bool,
    center: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node
  };

  static defaultProps = {
  };

  static contextTypes = {
    theme: PropTypes.object
  };

  render() {
    const { top, gutter, className, bottom, center, children, ...other } = this.props;
    const classes = classNames(css.grid, className, {
      [css.top]: top,
      [css.bottom]: bottom,
      [css.gutter]: gutter,
      [css.center]: center,
    });
    return (
      <div className={classes} {...other}>
        {React.Children.map(children, child => {
          return React.cloneElement(child, { gutter });
        })}
      </div>
    );
  }
}

export default Grid;

const css = oxygenCss({
  grid: {
    display: 'flex',
    '&gutter': {
      margin: `${Units.phone.gutter.mini}px`,
    },
    flexFlow: 'row wrap',
    '&top': {
      alignItems: 'flex-start',
    },
    '&bottom': {
      alignItems: 'flex-end',
    },
    '&center': {
      alignItems: 'center',
    },
  }
});
