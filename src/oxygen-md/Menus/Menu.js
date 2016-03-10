import React, { Component, PropTypes } from 'react';
import Paper from '../Paper';

class Menu extends Component {

  static propTypes = {
    children: PropTypes.node
  };

  static contextTypes = {
    theme: PropTypes.object
  };


  render() {
    const { children, ...other } = this.props;
    return (
      <Paper {...other}>
          {children}
      </Paper>
    );
  }
}

export default Menu;
