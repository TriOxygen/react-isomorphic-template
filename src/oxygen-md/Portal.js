import React, { PropTypes, Component } from 'react';
import CSSPropertyOperations from 'react/lib/CSSPropertyOperations';
import ReactDOM, { unmountComponentAtNode } from 'react-dom';
import classNames from 'classnames';

export default class Portal extends Component {

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    style: PropTypes.object,
    dialog: PropTypes.bool,
    tooltip: PropTypes.bool,
    menu: PropTypes.bool
  };

  componentWillMount() {
    const { style, className, menu, dialog, tooltip } = this.props;
    this.node = document.createElement('div');
    if (className) {
      this.node.className = classNames(className, {
        [css.dialog]: dialog,
        [css.menu]: menu,
        [css.tooltip]: tooltip
      });
    }
    CSSPropertyOperations.setValueForStyles(this.node, style);
    document.body.appendChild(this.node);
    this.renderPortal(this.props);
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

  renderPortal(props) {
    const { children } = props;
    ReactDOM.unstable_renderSubtreeIntoContainer(this, <div>{children}</div>, this.node);
  }

  render() {
    return null;
  }
}

const css = oxygenCss({
  menu: {
    zIndex: 99
  },
  dialog: {
    zIndex: 100
  },
  tooltip: {
    zIndex: 101
  }
});
