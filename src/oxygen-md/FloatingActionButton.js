import React, { PropTypes, Component } from 'react';
import radium from 'radium';
import Ink from './Ink';
import { Shadow, Units } from './Styles';
import classNames from 'classnames';

const styles = oxygenStyle({
  button: {
    border: 'none',
    display: 'block',
    position: 'relative',
    fontWeight: 500,
    color: 'inherit',
    userSelect: 'none',
    backgroundColor: 'transparent',
    textTransform: 'uppercase',
    outline: 'none',
    tapHighlightColor: 'transparent',
    textAlign: 'center',
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    overflow: 'hidden',
    margin: 0,
    padding: 0,
    fontSize: `${Units.phone.button.fontSize}px`,
    cursor: 'pointer',
    borderRadius: '50%',
    width: '100%'
  },
  root: {
    display: 'inline-block',
    width: `${Units.phone.floatingActionButton.size}px`,
    height: `${Units.phone.floatingActionButton.size}px`,
    lineHeight: `${Units.phone.floatingActionButton.size}px`,
    borderRadius: `${Units.phone.floatingActionButton.size / 2}px`,
    '&mini': {
      width: `${Units.phone.floatingActionButton.miniSize}px`,
      height: `${Units.phone.floatingActionButton.miniSize}px`,
      lineHeight: `${Units.phone.floatingActionButton.miniSize}px`,
      borderRadius: `${Units.phone.floatingActionButton.miniSize / 2}px`,
    },
  }
});

class FloatingActionButton extends Component {

  static displayName = 'FloatingActionButton';

  static propTypes = {
    disabled: PropTypes.bool,
    mini: PropTypes.bool,
    primary: PropTypes.bool,
    theme: PropTypes.object,
    secondary: PropTypes.bool,
    style: PropTypes.object,
    icon: PropTypes.node,
    children: PropTypes.node
  };

  static contextTypes = {
    theme: PropTypes.object
  };

  static defaultProps = {
    primary: true
  };

  getButtonStyles() {
    const theme = this.props.theme || this.context.theme;
    const { disabled, primary, secondary} = this.props;
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
        backgroundColor: theme.primary.A200.hex,
        boxShadow: Shadow[2],
        color: theme.primary.A200.text.default,

        ':hover': {
          backgroundColor: theme.primary[600].hex,
          color: theme.primary[600].text.default,
          boxShadow: Shadow[3],
        },
        ':active': {
          backgroundColor: theme.primary[700].hex,
          color: theme.primary[700].text.default,
          boxShadow: Shadow[2]
        }
      };
    } else if (secondary) {
      specStyles = {
        backgroundColor: theme.secondary.A200.hex,
        color: theme.secondary.A200.text.default,
        boxShadow: Shadow[2],
        ':hover': {
          backgroundColor: theme.secondary[600].hex,
          color: theme.secondary[600].text.default,
          boxShadow: Shadow[3],
        },
        ':active': {
          backgroundColor: theme.secondary[700].hex,
          color: theme.secondary[700].text.default,
          boxShadow: Shadow[2],
        }
      };
    } else {
      specStyles = {
        color: theme.text.default,
        boxShadow: Shadow[2],
        ':hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          boxShadow: Shadow[3]
        },
        ':active': {
          boxShadow: Shadow[2]
        }
      };
    }
    return [specStyles];
  }

  render() {
    const { disabled, children, mini, icon, primary, secondary } = this.props;
    const theme = this.props.theme || this.context.theme;
    const ink = !disabled && <Ink />;
    let iconEl;
    if (icon) {
      let iconProps;
      if (primary) {
        iconProps = { color: theme.primary[500].text.default };
      } else if (secondary) {
        iconProps = { color: theme.secondary[500].text.default };
      } else {
        iconProps = { color: theme.text.default };
      }
      iconEl = icon && React.cloneElement(icon, iconProps);
    }
    const rootClasses = classNames(styles.root, {
      [styles.mini]: mini
    });
    return (
      <div className={rootClasses}>
        <button className={styles.button} disabled={disabled} style={this.getButtonStyles()}>
          {ink}
          {iconEl}
          {children}
        </button>
      </div>
    );
  }
}

export default radium(FloatingActionButton);
