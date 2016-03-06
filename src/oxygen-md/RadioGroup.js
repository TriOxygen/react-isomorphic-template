import React, { PropTypes, Component } from 'react';
import Radio from './Radio';
import { Units, Colors } from './Styles';
import classNames from 'classnames';

class RadioGroup extends Component {
  static propTypes = {
    children: React.PropTypes.node,
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.bool,
      React.PropTypes.array,
      React.PropTypes.object,
    ]),
    onChange: PropTypes.func
  };

  state = {
    value: this.props.value
  };

  getValue() {
    return this.state.value;
  }

  renderChildren() {
    return React.Children.map(this.props.children, child => {
      if (child.type == Radio) {
        return React.cloneElement(child, {
          checked: this.state.value === child.props.value,
          onClick: value => {
            if (this.state.value !== value) {
              this.props.onChange && this.prop.onChange(value);
              this.setState({ value });
            }
          }
        });
      }
      return child;
    });
  }

  render() {
    return (
      <div>{this.renderChildren()}</div>
    );
  }
}

export default RadioGroup;