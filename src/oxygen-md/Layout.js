import React, { Component, PropTypes } from 'react';
import View from './View';
import classNames from 'classnames';
import { Motion, spring } from 'react-motion';

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
  state = {
    scrollTop: 0
  };

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

  handleWheel(e) {
    const { deltaMode, deltaY } = e;
     const target = this.refs.content;
    const rect = target.getBoundingClientRect();
    const { scrollHeight } = target;
    const scrollMax = scrollHeight - rect.height;
    rect.deltaMode = deltaMode;
    rect.deltaY = deltaY;
    if (this.props.onContentWheel) {
      this.props.onContentWheel(deltaY, scrollMax);
    }
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.scrollTop);
    this.refs.content.scrollTop = nextProps.scrollTop;
  }

  render() {
    const { children, ...rest } = this.props;
    const [header, ...otherChildren] = children;
    return (
      <View column className={classNames(layoutStyles.root)} {...rest}>
        {header}
        <div className={layoutStyles.content} ref={'content'} onWheel={this.handleWheel.bind(this)}>{otherChildren}</div>
      </View>
    );
  }
}

export default Layout;
