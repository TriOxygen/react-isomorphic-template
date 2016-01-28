import React, { Component, PropTypes } from 'react';
import { mergeStyles, Units } from '../Styles';
import Ink from '../Ink';
import classNames from 'classnames';

const styles = oxygenStyle({
  icon: {
    marginRight: `${Units.phone.list.padding}px`,
    '@desktop': {
      marginRight: `${Units.desktop.list.padding}px`
    }
  },
  root: {
    userSelect: 'none',
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    boxSizing: 'border-box',
    padding: `0 ${Units.phone.list.item.padding}px`,
    lineHeight: `${Units.phone.list.item.height}px`,
    height: `${Units.phone.list.item.height}px`,
    '@desktop': {
      lineHeight: `${Units.desktop.list.item.height}px`,
      height: `${Units.desktop.list.item.height}px`,
    },
    '&dense': {
      lineHeight: `${Units.phone.list.item.dense.height}px`,
      height: `${Units.phone.list.item.dense.height}px`,
      '@desktop': {
        lineHeight: `${Units.desktop.list.item.dense.height}px`,
        height: `${Units.desktop.list.item.dense.height}px`,

      }
    }
  },
});

class ListItem extends Component {
  static displayName = 'ListItem';

  static propTypes = {
    theme: PropTypes.object,
    dense: PropTypes.bool,
    active: PropTypes.bool,
    icon: PropTypes.node,
    children: PropTypes.node
  };

  static contextTypes = {
    theme: PropTypes.object
  };

  state = {
    hover: false
  };

  getStyle() {
    const theme = this.props.theme || this.context.theme;
    const { hover } = this.state;
    const { active } = this.props;
    return mergeStyles(
      hover ? {
        backgroundColor: theme.primary3,
        color: theme.primary3Text
      } : null,
      active ? {
        backgroundColor: theme.primary2,
        color: theme.primary2Text
      } : null,
    );
  }

  handleMouseEnter() {
    this.setState({ hover: true });
  }

  handleMouseLeave() {
    this.setState({ hover: false });
  }

  render() {
    const { dense, children, icon } = this.props;
    let iconElement;
    if (icon) {
      iconElement = React.cloneElement(icon, { className: styles.icon });
    }
    const rootClasses = classNames(styles.root, {
      [styles.dense]: dense
    });
    return (
      <div onMouseEnter={this.handleMouseEnter.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)} style={this.getStyle()} className={rootClasses}>
        <Ink />
        {iconElement}
        {children}
      </div>
    );
  }
}

export default ListItem;
