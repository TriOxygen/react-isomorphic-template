import React, { Component, PropTypes } from 'react';

const styles = oxygenCss({
  divider: {
    height: 1,
    border: 'none',
    margin: 0,
  }
})

class MenuDivider extends Component {
  static displayName = 'MenuDivider';

  static propTypes = {
    theme: PropTypes.object,
  };

  static contextTypes = {
    theme: PropTypes.object
  };

  getStyle() {
    const theme = this.props.theme || this.context.theme;
    return {
      backgroundColor: theme.text.divider,
    };
  }

  render() {
    return (
      <hr className={styles.divider} style={this.getStyle()}/>
    );
  }
}

export default MenuDivider;
