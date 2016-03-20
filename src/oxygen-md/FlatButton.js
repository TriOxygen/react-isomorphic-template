import React, { PropTypes, Component } from 'react';
import Ink from './Ink';
import { Units } from './Styles';
import classNames from 'classnames';

const styles = oxygenCss({
  flatButton: {
    '+flatButton': {
      marginLeft: Units.phone.gutter.mini
    },
    border: 'none',
    display: 'inline-block',
    fontWeight: 500,
    color: 'inherit',
    userSelect: 'none',
    backgroundColor: 'transparent',
    textTransform: 'uppercase',
    outline: 'none',
    tapHighlightColor: 'transparent',
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    overflow: 'hidden',
    cursor: 'pointer',
    minHeight: `${Units.phone.button.height}px`,
    lineHeight: `${Units.phone.button.height}px`,
    padding: `0 ${Units.phone.gutter.mini}px`,
    borderRadius: Units.phone.borderRadius,
    fontSize: `${Units.phone.button.fontSize}px`,
    position: 'relative',
    // margin: `0 ${Units.phone.gutter.mini}px`,
    minWidth: Units.phone.button.width,
    '@desktop': {
      margin: `0 ${Units.desktop.gutter.mini}px`,
      minWidth: Units.desktop.button.width,
      minHeight: `${Units.desktop.button.height}px`,
      lineHeight: `${Units.desktop.button.height}px`,
      padding: `0 ${Units.desktop.gutter.mini}px`,
      borderRadius: Units.desktop.borderRadius,
      fontSize: `${Units.desktop.button.fontSize}px`,
    },
    '&dense': {
      minHeight: `${Units.phone.button.dense.height}px`,
      lineHeight: `${Units.phone.button.dense.height}px`,
      '@desktop': {
        minHeight: `${Units.desktop.button.dense.height}px`,
        lineHeight: `${Units.desktop.button.dense.height}px`
      },
    },
    '&fullWidth': {
      display: 'block'
    },
  },

});

class FlatButton extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    dense: PropTypes.bool,
    primary: PropTypes.bool,
    theme: PropTypes.object,
    fullWidth: PropTypes.bool,
    secondary: PropTypes.bool,
    link: PropTypes.bool,
    href: PropTypes.string,
    onTouchTap: PropTypes.func,
    label: PropTypes.string,
    children: PropTypes.node
  };

  state = {
    active: false,
    hover: false
  };

  static contextTypes = {
    theme: PropTypes.object
  };

  static defaultProps = {
    label: ''
  };

  getButtonStyles(theme) {
    const { disabled, primary, secondary } = this.props;
    const { hover, active } = this.state;
    let style;
    if (disabled) {
      style = {
        color: hover && active ? theme.text.disabled : theme.text.disabled,
      };
    } else if (primary) {
      style = {
        color: active ? theme.primary[700].hex : hover ? theme.primary[600].hex : theme.primary[500].hex,
        backgroundColor: active ? theme.button.flat.active : hover ? theme.button.flat.hover : null,
      };
    } else if (secondary) {
      style = {
        color: active ? theme.secondary[700].hex : hover ? theme.secondary[600].hex : theme.secondary[500].hex,
        backgroundColor: active ? theme.button.flat.active : hover ? theme.button.flat.hover : null,
      };
    } else {
      style = {
        color: theme.text.default,
        backgroundColor: active? theme.button.flat.active : hover ? theme.button.flat.hover : null
      };
    }
    return style;
  }

  handleTouchTap = (event) => {
    const { disabled, onTouchTap, href } = this.props;
    if (!disabled && onTouchTap) {
      onTouchTap(href);
      event.preventDefault();
      event.stopPropagation();
    }
  };

  handleKeyPress = (event) => {
    const { keyCode } = event;
    if (keyCode === 0 || keyCode === 32 || keyCode == 13) {
      this.handleTouchTap();
      event.preventDefault();
    }
  };

  handleFocus = () => {
    if (!this.state.active) {
      this.setState({ active: true });
    }
  };

  handleBlur = () => {
    if (this.state.active) {
      this.setState({ active: false });
    }
  };

  handleMouseEnter = () => {
    if (!this.state.hover) {
      this.setState({ hover: true });
    }
  };

  handleMouseLeave = () => {
    if (this.state.hover) {
      this.setState({ hover: false });
    }
  };

  render() {
    const theme = this.props.theme || this.context.theme;
    const { link, disabled, fullWidth, dense, label, children, onTouchTap, ...other } = this.props;
    const ink = !disabled && <Ink />;
    const buttonClasses = classNames(styles.flatButton, {
      [styles.dense]: dense,
      [styles.fullWidth]: fullWidth
    });
    const props = {
      className: buttonClasses,
      disabled,
      style: this.getButtonStyles(theme),
      ...other,
      onKeyPress: this.handleKeyPress,
      onTouchTap: this.handleTouchTap,
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
    };
    const containerElement = link ? (disabled ? 'span' : 'a') : 'button';
    return React.createElement(containerElement, props, ink, children, label);
  }

}

export default FlatButton;
