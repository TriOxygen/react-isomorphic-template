import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import ScrollBar from './ScrollBar';
import { spring } from 'react-motion';
import Transition from 'react-motion-ui-pack';

const css = oxygenCss({
  root: {
    position: 'relative'
  },
  content: {
    overflow: 'hidden',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  }
});

export default class ScrollContent extends Component {
  state = {
    mouseOver: false
  };

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    onContentWheel: PropTypes.func
  };

  componentWillReceiveProps(nextProps) {
    this._content.scrollTop = nextProps.scrollTop;
  }

  getNode() {
    return this._content;
  }

  componentDidUpdate() {
    this.setScrollMax();
  }

  componentDidMount() {
    this.setScrollMax();
  }

  handleEnter() {
    if (!this.state.mouseOver) {
      this.setState({ mouseOver: true });
    }
  }

  handleLeave() {
    if (this.state.mouseOver) {
      this.setState({ mouseOver: false });
    }
  }

  setScrollMax() {
    const target = this._content;
    const rect = target.getBoundingClientRect();
    const { scrollHeight } = target;
    const  scrollMax = scrollHeight - rect.height;

    if (this.state.scrollMax !== scrollMax) {
      this.setState({ scrollMax: scrollMax });
    }
    if (this.state.height !== rect.height) {
      this.setState({ height: rect.height });
    }
  }

  handleWheel(e) {
    const target = this._content;
    const rect = target.getBoundingClientRect();
    const { deltaY } = e;
    const { scrollTop, scrollHeight } = target;
    const scrollMax = scrollHeight - rect.height;
    if ((scrollTop === scrollMax && deltaY > 0) || (scrollTop === 0 && deltaY < 0)) {
      return;
    }
    if (this.state.scrollMax !== scrollMax) {
      this.setState({ scrollMax: scrollMax });
    }
    if (this.state.height !== rect.height) {
      this.setState({ height: rect.height });
    }
    if (this.props.onContentWheel) {
      this.props.onContentWheel(deltaY, scrollMax);
    }
    e.stopPropagation();
  }

  render() {
    const { children, className, scrollTop, ...other } = this.props;
    const { height, scrollMax, mouseOver } = this.state;
    const classes = classNames(css.root, className);
    return (
      <div className={classes} {...other} onMouseEnter={this.handleEnter.bind(this)} onMouseLeave={this.handleLeave.bind(this)}>
        <div className={css.content} ref={c => this._content = c} onWheel={this.handleWheel.bind(this)} {...other}>
          {children}
        </div>
          <Transition
            component={false}
            enter={{
              opacity: spring(1, { stiffness: 50, damping: 20, precision: 10 })
            }}
            leave={{
              opacity: 0
            }}
          >
            {mouseOver && <ScrollBar key='bar' scrollTop={scrollTop} scrollMax={scrollMax} height={height} />}
          </Transition>
      </div>
    );
  }
}