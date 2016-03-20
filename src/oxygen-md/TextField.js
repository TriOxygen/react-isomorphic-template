import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import { Typography, Units } from './Styles';

class TextField extends Component {

  static propTypes = {
    autoFocus: PropTypes.bool,
    theme: PropTypes.object,
    type: PropTypes.string,
    fullWidth: PropTypes.bool,
    floatingLabelText: PropTypes.string,
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    placeholder: PropTypes.string
  };

  static contextTypes = {
    theme: PropTypes.object
  };

  state = {
    focused: false,
    value: this.props.value,
    defaultValue: this.props.defaultValue
  };

  handleBlur = () => {
    this.setState({ focused: false });
  };

  handleFocus = () => {
    this.setState({ focused: true });
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  focus = () => {
    this.refs.input.focus();
  };

  componentDidMount() {
    if (this.props.autoFocus) {
      this._timer = setTimeout(() => {
        this.refs.input.focus();
        this.refs.input.select();
      }, 200);
    }
  }

  componentWillUnmount() {
    if (this._timer) {
      clearTimeout(this._timer);
    }
  }

  getPlaceholderStyle() {
    const theme = this.props.theme || this.context.theme;
    return Object.assign({}, {
      color: theme.text.disabled
    });
  }

  getUnderlineStyle(active = false) {
    const theme = this.props.theme || this.context.theme;
    const { focused } = this.state;
    return Object.assign({
      borderColor: active && focused ? theme.primary1 : theme.text.disabled,
      transform: focused? 'scaleX(1)' : null,
    });
  }

  getLabelStyle() {
    const theme = this.props.theme || this.context.theme;
    const { focused, value } = this.state;
    return Object.assign({
      color: ( focused && !value) ? theme.primary1 : theme.text.disabled,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { value, defaultValue } = nextProps;
    this.setState({ value, defaultValue });
  }

  getValue() {
    return this.refs.input.value;
  }

  render() {
    const { type, placeholder, floatingLabelText, ...other } = this.props;
    const { focused, value } = this.state;
    let placeholderText;
    let floatingLabelEl;
    if (floatingLabelText) {
      placeholderText = focused && !value ? placeholder : null;
    } else {
      placeholderText = !value ? placeholder : null;
    }
    const inputClasses = classNames(inputStyles.root, {
      [inputStyles.hasFloatingLabel]: floatingLabelText,
    });
    const rootClasses = classNames(styles.root, {
      [styles.hasFloatingLabel]: floatingLabelText,
    });
    const placeHolderClasses = classNames(placeHolderStyles.root, {
      [placeHolderStyles.hasFloatingLabel]: floatingLabelText,
    });
    const underlineClasses = classNames(underlineStyles.root, underlineStyles.active, {
      [underlineStyles.focus]: focused
    });

    if (floatingLabelText) {
      const labelClasses = classNames(labelStyles.root, {
        [labelStyles.focus]: focused || value
      });
      floatingLabelEl = <label className={labelClasses} style={this.getLabelStyle()} onTouchTap={this.focus}>{floatingLabelText}</label>;
    }
    return (
      <div className={rootClasses}>
        <div className={placeHolderClasses} style={this.getPlaceholderStyle()}>{placeholderText}</div>
        {floatingLabelEl}
        <input ref="input" className={inputClasses} type={type} onChange={this.handleChange} onBlur={this.handleBlur} onFocus={this.handleFocus} {...other} value={value}/>
        <hr className={underlineStyles.root} style={this.getUnderlineStyle()}/>
        <hr className={underlineClasses} style={this.getUnderlineStyle(true)}/>
      </div>
    );
  }
}

export default TextField;

const styles = oxygenCss({
  root: {
    position: 'relative',
    height: 46,
    '&hasFloatingLabel': {
       height: 72,
    },
  }
});

const underlineStyles = oxygenCss({
  root: {
    position: 'absolute',
    left: 0,
    right: 0,
    borderStyle: 'none none solid none',
    borderWidth: 1,
    bottom: Units.phone.gutter.mini / 2,
    '&active': {
      transition: 'all 0.3s ease',
      transform: 'scaleX(0)',
      borderWidth: 2,
    }
  },
});


const inputStyles = oxygenCss({
  root: {
    border: 0,
    position: 'absolute',
    left: 0,
    width: '100%',
    resize: 'none',
    background: 'transparent',
    fontSize: Typography.phone.body1.fontSize,
    fontWeight: Typography.phone.body1.fontWeight,
    ':focus': {
      outline: 'none',
    },
    top: 16,
    '&hasFloatingLabel': {
      top: 40,
    },
  }
})

const placeHolderStyles = oxygenCss({
  root: {
    position: 'absolute',
    left: 0,
    width: '100%',
    top: 16,
    height: 24,
    boxSizing: 'border-box',
    padding: `0 0 ${Units.phone.gutter.mini}px 0`,
    '&hasFloatingLabel': {
       top: 40,
    },
  }
  //       color: theme.text.disabled,

});

const labelStyles = oxygenCss({
  root: {
    fontSize: Typography.phone.body1.fontSize,
    fontWeight: Typography.phone.body1.fontWeight,
    top: 40,
    height: 16,
    width: '100%',
    position: 'absolute',
    left: 0,
    marginBottom: 2,
    transition: 'all 0.3s ease',
    transformOrigin: 'bottom left',
    '&focus': {
      transform: 'scale(0.75) translate3d(0, -24px, 0) ',
    }
  }
});
