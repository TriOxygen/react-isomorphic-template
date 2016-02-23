import React, { PropTypes, Component } from 'react';
import radium from 'radium';
import Ink from './Ink';
import { Units } from './Styles';
import classNames from 'classnames';

const styles = oxygenCss({
  button: {
    position: 'relative',
    borderRadius: '50%',
    border: 'none',
    display: 'inline-block',
    width: Units.phone.iconSize * 2,
    height: Units.phone.iconSize * 2,
    padding: Units.phone.iconSize / 2,
    color: 'inherit',
    userSelect: 'none',
    backgroundColor: 'transparent',
    outline: 'none',
    tapHighlightColor: 'transparent',
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    cursor: 'pointer',
    overflow: 'hidden',
    verticalAlign: 'middle',
    margin: 'auto auto',
    '@desktop': {
      width: Units.desktop.iconSize * 2,
      height: Units.desktop.iconSize * 2,
    },
    '&dense': {
      width: Units.phone.iconSize * 1.5,
      height: Units.phone.iconSize * 1.5,
      '@desktop': {
        width: Units.desktop.iconSize * 1.5,
        height: Units.desktop.iconSize * 1.5,
      },
    },
  },
  icon: {
    zIndex: 2
  }
});

class IconButton extends Component {

  static propTypes = {
    disabled: PropTypes.bool,
    dense: PropTypes.bool,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    color: PropTypes.string,
    hoverColor: PropTypes.string,
    children: PropTypes.node,
    theme: PropTypes.object
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
        color: theme.text.disabled,
        ':hover': {
          color: theme.text.disabled
        }
      };
    } else if (primary) {
      specStyles = {
        color: theme.primary[500].hex,
        ':hover': {
          backgroundColor: theme.button.flat.hover,
          color: theme.primary[600].hex,
        },
        ':active': {
          backgroundColor: theme.button.flat.active,
          color: theme.primary[700].hex,
        }
      };
    } else if (secondary) {
      specStyles = {
        color: theme.secondary[500].hex,
        ':hover': {
          backgroundColor: theme.button.flat.hover,
          color: theme.secondary[600].hex,
        },
        ':active': {
          backgroundColor: theme.button.flat.active,
          color: theme.secondary[700].hex,
        }
      };
    }
    return [specStyles];
  }

  render() {
    const { dense, disabled, children, ...other } = this.props;
    const theme = this.props.theme || this.context.theme;
    const ink = !disabled && <Ink />;
    const buttonClasses = classNames(styles.button, dense ? styles.dense : null);
    return (
      <button className={buttonClasses} style={this.getButtonStyles(theme)} disabled={disabled} {...other}>
        {ink}
        {children}
      </button>
    );
  }
}

export default radium(IconButton);
