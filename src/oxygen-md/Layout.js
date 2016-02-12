import React, { Component, PropTypes } from 'react';
import View from './View';
import classNames from 'classnames';

const layoutStyles = oxygenCss({
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
    onContentScroll: PropTypes.func,
    theme: PropTypes.object
  };

  static contextTypes = {
    theme: PropTypes.object,
  };

  static defaultProps = {
    fixedHeader: true
  };

  handleScroll(e) {
    const { target } = e;
    const { scrollTop, scrollHeight } = target;
    const rect = e.target.getBoundingClientRect();
    rect.scrollTop = scrollTop;
    rect.scrollHeight = scrollHeight;
    const maxScroll = scrollHeight - rect.height;
    rect.scrollPercentage = (scrollTop / maxScroll) * 100;
    if (this.props.onContentScroll) {
      this.props.onContentScroll(rect);
    }
  }

  render() {
    const { children, ...rest } = this.props;
    const [header, ...otherChildren] = children;
    return (
      <View column className={classNames(layoutStyles.root)} {...rest}>
        {header}
        <div style={{ overflow: 'auto', flex: 1 }} onScroll={this.handleScroll.bind(this)}>{otherChildren}</div>
      </View>
    );
  }
}

export default Layout;
