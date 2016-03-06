import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

const Hammer = (typeof window !== 'undefined') ? require('hammerjs') : undefined;

const privateProps = {
  children: true,
  action: true,
  onTap: true,
  onDoubleTap: true,
  onPan: true,
  onPanStart: true,
  onPanEnd: true,
  onPanCancel: true,
  onSwipe: true,
  onPress: true,
  onPressUp: true,
  onPinch: true,
  onPinchIn: true,
  onPinchOut: true,
  onPinchStart: true,
  onPinchEnd: true,
  onPinchCancel: true,
  onRotate: true
};

const handlerToEvent = {
  action: 'tap press',
  onTap: 'tap',
  onDoubleTap: 'doubletap',
  onPanStart: 'panstart',
  onPan: 'pan',
  onPanEnd: 'panend',
  onPanCancel: 'pancancel',
  onSwipe: 'swipe',
  onPress: 'press',
  onPressUp: 'pressup',
  onPinch: 'pinch',
  onPinchIn: 'pinchin',
  onPinchOut: 'pinchout',
  onPinchStart: 'pinchstart',
  onPinchEnd: 'pinchend',
  onRotate: 'rotate'
};

function updateHammer(hammer, props) {
  if (props.vertical) {
    hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });
    hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
  } else {
    hammer.get('pan').set({ direction: Hammer.DIRECTION_HORIZONTAL });
    hammer.get('swipe').set({ direction: Hammer.DIRECTION_HORIZONTAL });
  }

  if (props.options) {
    Object.keys(props.options).forEach(option => {
      if (option === 'recognizers') {
        Object.keys(props.options.recognizers).forEach(gesture => {
          hammer.get(gesture).set(props.options.recognizers[gesture]);
        });
      } else {
        hammer.set({
          [option]: props.options[option]
        });
      }
    });
  }

  if (props.recognizeWith) {
    Object.keys(props.recognizeWith).forEach(gesture => {
      hammer.get(gesture).recognizeWith(props.recognizeWith[gesture]);
    });
  }

  Object.keys(props).forEach(property => {
    const e = handlerToEvent[property];
    if (e) {
      hammer.off(e);
      hammer.on(e, props[property]);
    }
  });
}

class HammerWrapper extends Component {

  static propTypes = {
    children: PropTypes.node
  };

  componentDidMount() {
    this.hammer = new Hammer(ReactDOM.findDOMNode(this));
    updateHammer(this.hammer, this.props);
  }

  componentDidUpdate() {
    if (this.hammer) {
      updateHammer(this.hammer, this.props);
    }
  }

  componentWillUnmount () {
    if (this.hammer) {
      this.hammer.stop();
      this.hammer.destroy();
    }
    this.hammer = null;
  }

  render () {
    const { children } = this.props;
    const props = {};

    Object.keys(this.props).forEach(function (i) {
      if (!privateProps[i]) {
        props[i] = this.props[i];
      }
    }, this);

    // Reuse the child provided
    // This makes it flexible to use whatever element is wanted (div, ul, etc)
    return React.cloneElement(React.Children.only(children), props);
  }
}

export default HammerWrapper;