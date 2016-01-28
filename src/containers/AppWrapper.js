import React, { PropTypes } from 'react';
import radium from 'radium';

class AppWrapper extends React.Component {
  static propTypes = {
    children: PropTypes.object
  };

  render() {
    return this.props.children;
  }
}

export default radium(AppWrapper, { isRoot: true });