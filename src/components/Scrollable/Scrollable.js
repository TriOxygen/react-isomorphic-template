import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Motion, spring } from 'react-motion';
import ScrollContent from './ScrollContent';

export default class Scrollable extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      scrollTop: 0,
    };
  }

  static propTypes = {
    children: PropTypes.node,
    scrollTop: PropTypes.number
  };

  handleWheel(deltaY) {
    let scrollTop = this.state.scrollTop + deltaY;
    this.scrollTo(scrollTop);
  }

  scrollTo(y) {
    let scrollTop = y;
    const content = this._content.getNode();
    const { scrollHeight } = content;
    const rect = content.getBoundingClientRect();
    const scrollMax = scrollHeight - rect.height;
    if (scrollTop > scrollMax) {
      scrollTop = scrollMax;
    } else if (scrollTop < 0) {
      scrollTop = 0;
    }
    this.setState({ scrollTop });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.scrollTop != this.state.scrollTop) {
      this.scrollTo(nextProps.scrollTop);
    }
  }



  render() {
    const { children, scrollTop, ...other } = this.props;
    return (
      <Motion style={{ y: spring(this.state.scrollTop, { stiffness: 150, damping: 20 }) }}>
        {({ y }) =>
          <ScrollContent ref={(c) => this._content = c} scrollTop={Math.round(y)} onContentWheel={this.handleWheel.bind(this)} {...other}>
            {children}
          </ScrollContent>
        }
      </Motion>
    );
  }
}