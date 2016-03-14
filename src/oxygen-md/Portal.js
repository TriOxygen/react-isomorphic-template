import React, { PropTypes, Component } from 'react';
import CSSPropertyOperations from 'react/lib/CSSPropertyOperations';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import classNames from 'classnames';

export default class Portal extends Component {

  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
    dialog: PropTypes.bool,
    tooltip: PropTypes.bool,
    className: PropTypes.string
  };

  componentWillMount() {
    const { style, className, dialog, tooltip } = this.props;
    const classes = classNames(className, {
      [css.dialog]: dialog,
      [css.tooltip]: tooltip
    })
    this.node = document.createElement('div');
    if (classes) {
      this.node.className = classes;
    }
    CSSPropertyOperations.setValueForStyles(this.node, style);
    document.body.appendChild(this.node);
    this.renderPortal();
  }

  componentWillReceiveProps(nextProps) {
    this.renderPortal(nextProps);
  }

  componentWillUnmount() {
    this.closePortal();
  }

  closePortal() {
    if (this.node) {
      unmountComponentAtNode(this.node);
      document.body.removeChild(this.node);
    }
    this.node = null;
  }

  renderPortal() {
    const { children } = this.props;
    ReactDOM.unstable_renderSubtreeIntoContainer(this, React.Children.only(children), this.node);
  }

  render() {
    return null;
  }
}

const css = oxygenCss({
  dialog: {
    zIndex: 100
  },
  tooltip: {
    zIndex: 101
  }
})
