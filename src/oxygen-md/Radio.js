import React, { PropTypes, Component } from 'react';
import { Units, Colors } from './Styles';
import classNames from 'classnames';

class Radio extends Component {
  static propTypes = {
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.bool,
      React.PropTypes.array,
      React.PropTypes.object,
    ]),
    fullWidth: PropTypes.bool,
    label: PropTypes.node,
    left: PropTypes.bool,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    primary: PropTypes.bool,
    theme: PropTypes.object,
    secondary: PropTypes.bool,
    onTouchTap: PropTypes.func
  };

  static contextTypes = {
    theme: PropTypes.object
  };

  state = {
    active: false
  };

  handleTouchTap() {
    const { disabled, } = this.props;
    !disabled && this.props.onTouchTap && this.props.onTouchTap(this.props.value);
  }

  handleFocus() {
    this.setState({ active: true });
  }

  handleBlur() {
    this.setState({ active: false });
  }

  handleKeyPress(e) {
    if (e.keyCode === 0 || e.keyCode === 32 || e.keyCode == 13) {
      this.handleTouchTap();
      e.preventDefault();
    }
  }

  getStyles() {
    const theme = this.props.theme || this.context.theme;
    const { primary, secondary, checked } = this.props;
    let themeStyles = {};
    if (primary && checked) {
      themeStyles = {
        borderColor: theme.primary[500].hex
      }
    } else if (secondary && checked) {
      themeStyles = {
        borderColor: theme.secondary[500].hex
      }
    }
    return themeStyles;
  }

  getCheckStyles() {
    const theme = this.props.theme || this.context.theme;
    const { checked, primary, secondary } = this.props;
    let themeStyles = {};
    if (primary && checked) {
      themeStyles = {
        backgroundColor: theme.primary[500].hex
      }
    } else if (secondary && checked) {
      themeStyles = {
        backgroundColor: theme.secondary[500].hex
      }
    }
    return themeStyles;
  }

  render() {
    const { disabled, checked, label, left, fullWidth } = this.props;
    const { active } = this.state;
    let tabIndex = null;

    if (!disabled) {
      tabIndex = 0;
    }

    const classes = classNames(radioStyles.border, {
      [radioStyles.active]: active,
      [radioStyles.checked]: checked,
      [radioStyles.disabled]: disabled
    });

    return (
      <div
        disabled={disabled}
        onKeyPress={this.handleKeyPress.bind(this)}
        onFocus={this.handleFocus.bind(this)}
        onBlur={this.handleBlur.bind(this)}
        className={classNames(radioStyles.root, { [radioStyles.fullWidth]: fullWidth })}
        tabIndex={tabIndex}
        onTouchTap={this.handleTouchTap.bind(this)}
      >
        {left ? label : null}
        <div className={classes} style={this.getStyles()}>
          <span className={radioStyles.check} style={this.getCheckStyles()}/>
        </div>
        {!left ? label : null}
      </div>
    );
  }
}

const radioStyles = oxygenCss({
  root: {
    display: 'inline-block',
    outline: 'none',
    cursor: 'pointer',
    padding: Units.phone.gutter.mini / 2,
    position: 'relative',
    '&fullWidth': {
      display: 'block',
    },
  },
  border: {
    display: 'inline-block',
    height: 20,
    width: 20,
    marginRight: Units.phone.gutter.mini,
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: Colors.material.grey[500].hex,
    borderRadius: '50%',
    transition: 'border-color .25s ease',
    boxSizing: 'border-box',
    verticalAlign: 'middle',
    '&active': {
      boxShadow: '0 0 10px rgba(255 , 255, 0, 1)',
    },
    '&disabled': {
      opacity: 0.25,
      cursor: 'default'
    },
    '&checked': {
      borderColor: Colors.material.teal[500].hex,
      check: {
        backgroundColor: Colors.material.teal[500].hex,
        transform: 'scale(0.75, 0.75)',
        opacity: 1
      }
    },
    check: {
      transformOrigin: '50% 50%',
      verticalAlign: 'middle',
      display: 'inline-block',
      transform: 'scale(1, 1)',
      height: 16,
      width: 16,
      boxSizing: 'border-box',
      // margin: 4,
      backgroundColor: Colors.material.grey[500].hex,
      borderRadius: '50%',
      opacity: 0,
      zIndex: -1,
      transition: 'transform .25s ease, opacity .25s ease, background-color .25s ease',
    }
  },
});

export default Radio;
