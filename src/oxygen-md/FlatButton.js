import React, { PropTypes, Component } from 'react';
import radium from 'radium';
import Ink from './Ink';
import { Units } from './Styles';
import classNames from 'classnames';

const styles = oxygenStyle({
  button: {
    border: 'none',
    display: 'block',
    width: '100%',
    fontWeight: 500,
    margin: 0,
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
    '@desktop': {
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
  },

  fullWidth: {
    display: 'block'
  },
  root: {
    display: 'inline-block',
    position: 'relative',
    margin: `0 ${Units.phone.gutter.mini}px`,
    minWidth: Units.phone.button.width,
    '@desktop': {
      margin: `0 ${Units.desktop.gutter.mini}px`,
      minWidth: Units.desktop.button.width,
    }
  }
});

class FlatButton extends Component {

  static displayName = 'FlatButton';

  static propTypes = {
    disabled: PropTypes.bool,
    dense: PropTypes.bool,
    primary: PropTypes.bool,
    theme: PropTypes.object,
    fullWidth: PropTypes.bool,
    secondary: PropTypes.bool,
    label: PropTypes.string,
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
    } else {
      specStyles = {
        color: theme.text.default,
        ':hover': {
          backgroundColor: theme.button.flat.hover,
        },
        ':active': {
          backgroundColor: theme.button.flat.active,
        }
      };
    }
    return [specStyles];
  }

  render() {
    const theme = this.props.theme || this.context.theme;
    const { dense, disabled, fullWidth, label, children } = this.props;
    const ink = !disabled && <Ink />;
    const rootClasses = classNames(styles.root, fullWidth ? styles.fullWidth : null);
    const buttonClasses = classNames(styles.button, dense ? styles.dense : null);

    return (
      <div className={rootClasses}>
        <button className={buttonClasses} disabled={disabled} style={this.getButtonStyles(theme)}>
          {ink}
          {label}
          {children}
        </button>
      </div>
    );
  }
}

export default radium(FlatButton);
