import React, { PropTypes, Component } from 'react';
import { mergeStyles } from './Styles';

const styles = {
  input: {
    root: {
      border: '0',
      position: 'absolute',
      left: 0,
      width: '100%',
      resize: 'none',
      background: 'transparent',
    },
    focus: {
      outline: 'none',
    }
  },
  placeholder: {
    position: 'absolute',
    left: 0,
    width: '100%',
  },
  label: {
    root: {
      top: 40,
      height: 16,
      width: '100%',
      position: 'absolute',
      left: 0,
      marginBottom: 2,
      transition: 'all 0.3s ease',
      transformOrigin: 'bottom left',
    },
    focus: {
      transform: 'scale(0.75) translate3d(0, -24px, 0) ',
    }
  },
  underline: {
    root: {
      position: 'absolute',
      left: 0,
      right: 0,
      borderStyle: 'none none solid none',
      borderWidth: 1,
      transition: 'all 0.3s ease'
    }
  },
  root: {
    position: 'relative',
  }
};


class TextField extends Component {
  static displayName = 'TextField';

  static propTypes = {
    theme: PropTypes.object,
    type: PropTypes.string,
    fullWidth: PropTypes.bool,
    floatingLabelText: PropTypes.string,
    placeholder: PropTypes.string
  };

  static contextTypes = {
    theme: PropTypes.object
  };

  state = {
    focused: false,
    hasValue: false
  };

  getInputStyle() {
    const { focused } = this.state;
    const { floatingLabelText } = this.props;
    const theme = this.props.theme || this.context.theme;
    const { units, typography } = theme;
    return mergeStyles(styles.input.root,
      {
        padding: `0 0 ${units.gutter.mini}px 0`,
        height: 24,
        boxSizing: 'border-box',
        borderColor: theme.text.default,
      }, floatingLabelText ? {
        top: 40,
      } : {
        top: 16
      },
      focused ? {
        borderColor: theme.primary1,
      } : null,
      typography.base,
      focused ? styles.input.focus : null
    );
  }

  getLabelStyle() {
    const { focused, hasValue } = this.state;
    const theme = this.props.theme || this.context.theme;
    const { typography } = theme;
    return mergeStyles(styles.label.root,
      typography.base,
      focused || hasValue ? styles.label.focus : null
    );
  }

  getStyle() {
    const { floatingLabelText } = this.props;
    const theme = this.props.theme || this.context.theme;
    const { typography } = theme;
    return mergeStyles(styles.root, typography.base,
      floatingLabelText ? {
        height: 72,
      } : {
        height: 46
      }
    );
  }

  getPlaceholderStyle() {
    const theme = this.props.theme || this.context.theme;
    const { typography, units } = theme;
    const { floatingLabelText } = this.props;
    return mergeStyles(styles.placeholder, typography.base,
      {
        padding: `0 0 ${units.gutter.mini}px 0`,
        height: 24,
        boxSizing: 'border-box',
        color: theme.text.disabled,
      }, floatingLabelText ? {
        top: 40,
      } : {
        top: 16
      }
    );
  }

  getUnderlineStyle(active = false) {
    const theme = this.props.theme || this.context.theme;
    const { units } = theme;
    const { focused } = this.state;
    let activeStyle;
    if (active) {
      if (focused) {
        activeStyle = {
          transform: 'scaleX(1)',
          borderWidth: 2,
          borderColor: theme.primary1,
        };
      } else {
        activeStyle = {
          transform: 'scaleX(0)',
          borderWidth: 2,
          borderColor: theme.primary1,
        };
      }
    }
    return mergeStyles(styles.underline.root,
      {
        borderColor: theme.text.disabled,
        bottom: units.gutter.mini / 2
      },
      activeStyle,
    );
  }

  handleBlur() {
    this.setState({focused: false});
  }

  handleFocus() {
    this.setState({focused: true});
  }

  handleChange(event) {
    this.setState({hasValue: !!event.target.value});
  }

  focus() {
    this.refs.input.focus();
  }

  render() {
    const { type, placeholder, floatingLabelText } = this.props;
    const { focused, hasValue } = this.state;
    let placeholderText;
    let floatingLabelEl;
    if (floatingLabelText) {
      placeholderText = focused && !hasValue ? placeholder : null;
    } else {
      placeholderText = !hasValue ? placeholder : null;
    }
    if (floatingLabelText) {
      floatingLabelEl = <label style={this.getLabelStyle()} onTouchTap={this.focus.bind(this)}>{floatingLabelText}</label>;
    }
    return (
      <div style={this.getStyle()}>
        <div style={this.getPlaceholderStyle()}>{placeholderText}</div>
        {floatingLabelEl}
        <input ref="input" style={this.getInputStyle()} type={type} onChange={this.handleChange.bind(this)} onBlur={this.handleBlur.bind(this)} onFocus={this.handleFocus.bind(this)}/>
        <hr style={this.getUnderlineStyle()}/>
        <hr style={this.getUnderlineStyle(true)}/>
      </div>
    );
  }
}

export default TextField;
