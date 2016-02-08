import React from 'react';
import classNames from 'classnames';
import Toggle from './Toggle';
import Ink from './Ink';
import { Units, Colors } from './Styles';

const checkStyles = oxygenStyle({
  root: {
    width: 20,
    height: 20,
    position: 'relative',
    cursor: 'pointer',
    margin: Units.phone.gutter.mini,
    outline: 'none',
    borderRadius: 2,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: Colors.material.grey[500].hex,
    transitionDelay: '0.2s',
    display: 'inline-block',
    overflow: 'visible',
    '&active': {
      boxShadow: '0 0 10px rgba(255 , 255, 0, 1)',
    },
    '&checked': {
      background: Colors.material.teal[500].hex,
      borderColor: Colors.material.teal[500].hex,
      ' check': {
        opacity: 1,
        transform: 'translate(-2px, -2px) scale(1) rotate(45deg) '
      }
    },
    '&disabled': {
      cursor: 'default',
      opacity: 0.25
    }
  },
  check: {
    display: 'block',
    position: 'absolute',
    transitionDuration: '.3s',
    top: 0,
    left: 7,
    width: 7,
    height: 15,
    border: '3px solid #fff',
    borderRadius: 2,
    borderTop: 'none',
    borderLeft: 'none',
    opacity: 0,
  }
});

class Checkbox extends Toggle {
  getStyles() {
    const theme = this.props.theme || this.context.theme;
    const { primary, secondary } = this.props;
    const { checked } = this.state;
    let themeStyles = {};
    if (primary && checked) {
      themeStyles = {
        backgroundColor: theme.primary[500].hex,
        borderColor: theme.primary[500].hex
      }
    } else if (secondary && checked) {
      themeStyles = {
        backgroundColor: theme.secondary[500].hex,
        borderColor: theme.secondary[500].hex
      }
    }
    return themeStyles;
  }

  render() {
    const { disabled } = this.props;
    const { checked, active } = this.state;
    let tabIndex = null;
    let ink;

    const rootClasses = classNames(checkStyles.root, {
      [checkStyles.checked]: checked,
      [checkStyles.active]: active,
      [checkStyles.disabled]: disabled
    });


    if (!disabled) {
      tabIndex = 0;
      ink = <Ink radius={80}/>;
    }

    return (
      <div
        style={this.getStyles()}
        disabled={disabled}
        className={rootClasses}
        tabIndex={tabIndex}
        onClick={this.handleClick.bind(this)}
        onKeyPress={this.handleKeyPress.bind(this)}
        onFocus={this.handleFocus.bind(this)}
        onBlur={this.handleBlur.bind(this)}
      >
        <span className={checkStyles.check}/>
        {ink}
      </div>
    );
  }
}

export default Checkbox;