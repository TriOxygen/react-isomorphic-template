import React, { Component, PropTypes } from 'react';
import View from './View';
import classNames from 'classnames';

const layoutStyles = oxygenCss({
  root: {
    height: '100%',
  },
  test: {
    fontSize: 30
  },
  content: {
    overflow: 'hidden',
    flex: 1
  }
});

class Layout extends Component {
  static propTypes = {
    children: PropTypes.node,
    header: PropTypes.node,
    fixedHeader: PropTypes.bool,
    onContentScroll: PropTypes.func,
    theme: PropTypes.object
  };

  static contextTypes = {
    theme: PropTypes.object,
  };

  static defaultProps = {
    fixedHeader: true
  };

  render() {
    const { children, ...rest } = this.props;
    const [header, ...otherChildren] = children;
    return (
      <View column className={classNames(layoutStyles.root)} {...rest}>
        {header}
        {otherChildren}
      </View>
    );
  }
}

export default Layout;
