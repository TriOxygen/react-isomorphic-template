import React, { Component, PropTypes } from 'react';
import View from './View';
import classNames from 'classnames';

const layoutStyles = oxygenStyle({
  root: {
    height: '100%',
  },
  test: {
    fontSize: 30
  }
});

class Layout extends Component {
  static displayName = 'Layout';

  static propTypes = {
    children: PropTypes.node,
    header: PropTypes.node,
    fixedHeader: PropTypes.bool,
    theme: PropTypes.object
  };

  static contextTypes = {
    theme: PropTypes.object,
  };

  static defaultProps = {
    fixedHeader: true
  };

  render() {
    const { children } = this.props;
    const [header, ...other] = children;
    return (
      <View column className={classNames(layoutStyles.root)}>
        {header}
        <div style={{ overflow: 'auto', flex: 1 }}>{other}</div>
      </View>
    );
  }
}

export default Layout;
