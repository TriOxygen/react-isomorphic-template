import React, { PropTypes, Component } from 'react';
import radium from 'radium';
import Ink from './Ink';
import classNames from 'classnames';
import { Shadow, Units } from './Styles';

class RaisedButton extends Component {
  static propTypes = {
    disabled: PropTypes.bool,
    dense: PropTypes.bool,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    theme: PropTypes.object,
    fullWidth: PropTypes.bool,
    label: PropTypes.string,
    link: PropTypes.bool,
    href: PropTypes.string,
    onTouchTap: PropTypes.func,
    children: PropTypes.node
  };

  static contextTypes = {
    theme: PropTypes.object
  };

  static defaultProps = {
    label: ''
  };

  getButtonStyles(theme) {
    const { disabled, primary, secondary } = this.props;
    let specStyles;
    if (disabled) {
      specStyles = {
        boxShadow: 'none',
        backgroundColor: theme.button.raised.disabled,
        color: theme.text.disabled,
        ':hover': {
          backgroundColor: theme.button.raised.disabled
        }
      };
    } else if (primary) {
      specStyles = {
        backgroundColor: theme.primary[500].hex,
        color: theme.primary[500].text.default,
        ':hover': {
          backgroundColor: theme.primary[600].hex,
          color: theme.primary[600].text.default,
        },
        ':active': {
          backgroundColor: theme.primary[700].hex,
          color: theme.primary[700].text.default,
        }
      };
    } else if (secondary) {
      specStyles = {
        backgroundColor: theme.secondary[500].hex,
        color: theme.secondary[500].text.default,
        ':hover': {
          backgroundColor: theme.secondary[600].hex,
          color: theme.secondary[600].text.default,
        },
        ':active': {
          backgroundColor: theme.secondary[700].hex,
          color: theme.secondary[700].text.default,
        }
      };
    } else {
      specStyles = {
        color: theme.text.default,
        ':hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
        },
      };
    }
    return [specStyles];
  }

  handleTouchTap = (event) => {
    const { link, disabled, onTouchTap, href } = this.props;
    if (!disabled && onTouchTap) {
      onTouchTap(href);
      if (link) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
  };

  handleKeyPress = (event) => {
    const { keyCode } = event;
    if (keyCode === 0 || keyCode === 32 || keyCode == 13) {
      this.handleTouchTap();
      event.preventDefault();
    }
  };

  render() {
    const theme = this.props.theme || this.context.theme;
    const { link, disabled, fullWidth, dense, label, children, onTouchTap, ...other } = this.props;
    const ink = !disabled && <Ink />;
    const buttonClasses = classNames(styles.raisedButton, {
      [styles.dense]: dense,
      [styles.fullWidth]: fullWidth
    });
    const props = {
      className: buttonClasses,
      disabled,
      style: this.getButtonStyles(theme),
      ...other,
      tabIndex: 0,
      onKeyPress: this.handleKeyPress,
      onTouchTap: this.handleTouchTap,
    };
    const containerElement = link ? (disabled ? 'span' : 'a') : 'div';
    return React.createElement(containerElement, props, ink, children, label);
  }
}



const styles = oxygenCss({
  raisedButton: {
    border: 'none',
    display: 'inline-block',
    fontWeight: 300,
    textAlign: 'center',
    textDecoration: 'none',
    backgroundColor: 'rgba(158, 158, 158, 0.2)',
    color: 'inherit',
    overflow: 'hidden',
    userSelect: 'none',
    position: 'relative',
    textTransform: 'uppercase',
    outline: 'none',
    tapHighlightColor: 'transparent',
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    cursor: 'pointer',
    boxShadow: Shadow[1],
    minHeight: `${Units.phone.button.height}px`,
    lineHeight: `${Units.phone.button.height}px`,
    padding: `0 ${Units.phone.gutter.mini}px`,
    borderRadius: Units.phone.borderRadius,
    fontSize: `${Units.phone.button.fontSize}px`,
    minWidth: Units.phone.button.width,
    margin: `auto ${Units.phone.gutter.mini}px`,
    boxSizing: 'border-box',
    ':hover': {
      boxShadow: Shadow[2],
      textDecoration: 'none',
    },
    ':focus': {
      boxShadow: Shadow[2]
    },
    '@desktop': {
      margin: `auto ${Units.desktop.gutter.mini}px`,
      minWidth: Units.desktop.button.width,
      minHeight: `${Units.desktop.button.height}px`,
      lineHeight: `${Units.desktop.button.height}px`,
      padding: `0 ${Units.desktop.gutter.mini}px`,
      borderRadius: Units.desktop.borderRadius,
      fontSize: `${Units.desktop.button.fontSize}px`,
    },
    dense: {
      minHeight: `${Units.phone.button.dense.height}px`,
      lineHeight: `${Units.phone.button.dense.height}px`,
      '@desktop': {
        minHeight: `${Units.desktop.button.dense.height}px`,
        lineHeight: `${Units.desktop.button.dense.height}px`
      },
    },
    '&fullWidth': {
      display: 'block',
    }
  }
});


export default radium(RaisedButton);